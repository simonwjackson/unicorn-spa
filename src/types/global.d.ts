interface Selection {
   modify(s: string, t: string, u: string): void
}
declare module '@cypress/code-coverage/task' {
   export default function codecov(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
   ): void
}

type EmptyRecord = Record<never, never>
type JustChildren = React.PropsWithChildren<EmptyRecord>
