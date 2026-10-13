/** Runtime (not build-time) values the browser needs. Read from env on the server per request,
 * so one Docker image can be promoted from staging to prod unchanged. */
export interface PublicConfig {
  appEnv: string;
  crmUrl: string;
  posUrl: string;
}
