export const BadgeColors = {
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
    GRAY: 'gray',
}
export type BadgeColor = typeof BadgeColors[keyof typeof BadgeColors];

export interface BaseBadgeProps {
    count: number
    color?: BadgeColor
}