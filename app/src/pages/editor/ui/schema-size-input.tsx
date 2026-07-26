import { useState, useEffect } from 'react'
import { NumberInput } from '@mantine/core'
import type { SchemaType } from 'core/collections/template'
import { useI18n } from 'features/i18n'

interface Props {
  value: number
  onChange: (v: number) => void
  dimension: 'rows' | 'columns'
  schemaType: SchemaType
  disabled?: boolean
  normalizeValue: (v: number, type: SchemaType) => number
  getLimits: (type: SchemaType) => { min: number; max: number }
  getStep: (type: SchemaType) => number
}

export const SchemaSizeInput = ({
  value,
  onChange,
  dimension,
  schemaType,
  disabled,
  normalizeValue,
  getLimits,
  getStep
}: Props) => {
  const { localize } = useI18n()
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  const { min, max } = getLimits(schemaType)
  const step = getStep(schemaType)

  const handleBlur = () => {
    const normalized = normalizeValue(displayValue, schemaType)
    setDisplayValue(normalized)
    onChange(normalized)
  }

  return (
    <NumberInput
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      label={localize(`editor.labels.${dimension}`)}
      value={displayValue}
      onChange={v => {
        const num = typeof v === 'string' ? parseInt(v, 10) : v
        if (isNaN(num)) return
        setDisplayValue(num)
      }}
      onBlur={handleBlur}
    />
  )
}
