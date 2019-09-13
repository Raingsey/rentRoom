export interface IMenuItem {
  title: string,
  icon_class?: string,
  icon_bg?: string,
  icon_color?: string,
  active?: boolean,
  disabled?: boolean,
  groupTitle?: boolean,
  routing?: string,
  externalLink?: string,
  sub?: IMenuItemSub[],
  badge?: IMenuItemBadge
}

export interface IMenuItemIcon {
  class?: string,
  color?: string,
  bg?: string
}
export interface IMenuItemSub {
  title: string,
  icon_class?: string,
  icon_bg?: string,
  icon_color?: string,
  active?: boolean,
  disabled?: boolean,
  routing?: string,
  externalLink?: string,
  sub?: IMenuItemSub[]
}
export interface IMenuItemBadge {
  text?: string,
  color?: string,
  bg?: string
}
