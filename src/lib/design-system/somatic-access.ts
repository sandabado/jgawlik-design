export const SOMATIC_SPECIMEN_PATH = '/somatic-specimen';

/** An owner review surface, never a deployable route or a cookie privilege. */
export function isSomaticSpecimenEnabled(): boolean {
  return process.env.NODE_ENV === 'development'
    && process.env.PORT === '3001'
    && process.env.PUBLIC_GATE === 'false'
    && process.env.PORTFOLIO_MODE === 'false';
}
