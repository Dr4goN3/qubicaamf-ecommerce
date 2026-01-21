export const BadgeColors = {
    RED: 'd23232',
    GREEN: 'green',
    BLUE: 'blue',
    GRAY: 'gray',
}
export type BadgeColor = typeof BadgeColors[keyof typeof BadgeColors];

export interface BaseBadgeProps {
    count: number
    color?: BadgeColor
}