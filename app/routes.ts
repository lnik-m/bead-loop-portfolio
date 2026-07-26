import {
  type RouteConfig,
  index,
  route,
  layout
} from '@react-router/dev/routes'

export default [
  layout('./routes/layout.tsx', [
    index('./routes/page.tsx'),

    layout('./routes/dashboard/layout.tsx', [
      route('editor', './routes/dashboard/editor/page.tsx'),
      route('editor/:templateId', './routes/dashboard/editor/[id]/page.tsx'),
      route('projects', './routes/dashboard/projects/page.tsx'),
      route(
        'projects/creating',
        './routes/dashboard/projects/creating/page.tsx'
      ),
      route('projects/:projectId', './routes/dashboard/projects/[id]/page.tsx')
    ]),

    route('*', './routes/not-found/page.tsx')
  ])
] satisfies RouteConfig
