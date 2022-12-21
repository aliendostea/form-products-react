export const size = {
  miniPhone: '23.75em',
  phone: '37.5em',
  tabPort: '56.25em',
  betweenPcAndTabPort: '71.875em',
  betweenPcAndTabPort2: '80em',
  tabLand: '85em',
  tabBetweenLandAndDesktop: '100em',
  bigDesktop: '112.5em',
};
const mediaQuery = '@media only screen and';

export const device = {
  miniPhone: `${mediaQuery} (max-width: ${size.miniPhone})`,
  phone: `${mediaQuery} (max-width: ${size.phone})`,
  tabPort: `${mediaQuery} (max-width: ${size.tabPort})`,
  betweenPcAndTabPort: `${mediaQuery} (max-width: ${size.betweenPcAndTabPort})`,
  betweenPcAndTabPort2: `${mediaQuery} (max-width: ${size.betweenPcAndTabPort2})`,
  tabLand: `${mediaQuery} (max-width: ${size.tabLand})`,
  tabBetweenLandAndDesktop: `${mediaQuery} (max-width: ${size.tabBetweenLandAndDesktop})`,
  bigDesktop: `${mediaQuery} (min-width: ${size.bigDesktop})`,
};
