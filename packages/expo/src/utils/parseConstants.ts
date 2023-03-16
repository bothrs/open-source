/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* --- Types ----------------------------------------------------------------------------------- */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any$Todo = any

export enum BRANCH_ENV {
  development = 'development',
  staging = 'staging',
  production = 'production',
}

export type BranchEnvironment = `${BRANCH_ENV}`

export type BranchConfig = {
  devBranches: string[]
  stageBranches: string[]
  prodBranches: string[]
}

/** --- parseCOnstants() ----------------------------------------------------------------------- */
/** -i- Parse expo-constants to get relevant app info
 ** @param Constants - Your version of expo-constants
 ** @param branchConfig - Config list of all branches matching dev / stage / prod */
export const parseConstants = (
  Constants: Any$Todo,
  branchConfig: BranchConfig
) => {
  // Manifests
  const { manifest, manifest2, expoConfig, platform } = Constants

  // Local Debugger IP
  const debuggerHostUrl: string | undefined = manifest?.debuggerHost || manifest2?.extra?.expoGo?.debuggerHost // prettier-ignore
  const localUrl: string | undefined = debuggerHostUrl?.split(':').shift() // prettier-ignore

  // Branch
  const branchName: string | undefined = manifest?.releaseChannel || manifest2?.metadata?.branchName // prettier-ignore

  // Versions
  const appVersion: string = expoConfig?.version || manifest?.version || manifest2?.version // prettier-ignore
  const sdkVersion: string = expoConfig?.sdkVersion || manifest?.sdkVersion || manifest2?.sdkVersion // prettier-ignore
  const iosBuildnumber: number | null | undefined = platform?.ios?.buildNumber
  const androidVersionCode: string | null | undefined = platform?.android?.versionCode // prettier-ignore

  // -- Environment --

  const isLocalDevelopment = !!localUrl
  const getCurrentEnvironment = (): BranchEnvironment => {
    const { devBranches, stageBranches, prodBranches } = branchConfig
    if (isLocalDevelopment) return BRANCH_ENV.development
    if (devBranches.includes(branchName!)) return BRANCH_ENV.development
    if (stageBranches.includes(branchName!)) return BRANCH_ENV.staging
    if (prodBranches.includes(branchName!)) return BRANCH_ENV.production
    return BRANCH_ENV.production
  }

  const branchEnv = getCurrentEnvironment()
  const isDevelopment = branchEnv === BRANCH_ENV.development
  const isStaging = branchEnv === BRANCH_ENV.staging
  const isProduction = branchEnv === BRANCH_ENV.production

  // -- Return results --

  return {
    localUrl,
    appVersion,
    sdkVersion,
    iosBuildnumber,
    androidVersionCode,
    branchName,
    branchEnv,
    isLocalDevelopment,
    isDevelopment,
    isStaging,
    isProduction,
  }
}
