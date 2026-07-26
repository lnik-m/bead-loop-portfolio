import { useLocation, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { actions } from 'actions'
import { routes } from 'app/routes'
import { ProjectsSkeleton } from '../loading'

export default function CreatingProjectPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const templateId = location.state?.templateId

  useEffect(() => {
    if (!templateId) {
      navigate(routes.myProjects, { replace: true })
      return
    }

    let isMounted = true

    const createProject = async () => {
      try {
        const newProject = await actions.projects.add({ templateId })

        if (!isMounted) return

        if (newProject?.id) {
          navigate(`${routes.project}${newProject.id}`, {
            replace: true,
            state: newProject
          })
        } else {
          navigate(routes.myProjects, { replace: true })
        }
      } catch (error) {
        if (!isMounted) return
        console.error('Failed to create project:', error)
        navigate(routes.myProjects, { replace: true })
      }
    }

    createProject()

    return () => {
      isMounted = false
    }
  }, [templateId, navigate])

  return <ProjectsSkeleton />
}
