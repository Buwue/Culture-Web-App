import type { FC } from "react"
import { useState } from "react"
import { LifeBuoy01, LogOut01, Settings01 } from "@untitledui/icons"
import { AnimatePresence, motion } from "motion/react"
import {
  Button as AriaButton,
  DialogTrigger as AriaDialogTrigger,
  Popover as AriaPopover,
} from "react-aria-components"
import { Avatar } from "@/components/base/avatar/avatar"
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group"
import { Button } from "@/components/base/buttons/button"
import { ButtonUtility } from "@/components/base/buttons/button-utility"
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo"
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal"
import { cx } from "@/utils/cx"
import { MobileNavigationHeader } from "../application/app-navigation/base-components/mobile-header"
import { NavAccountMenu } from "../application/app-navigation/base-components/nav-account-card"
import { NavItemBase } from "../application/app-navigation/base-components/nav-item"
import { NavButton } from "../application/app-navigation/base-components/nav-button"
import { NavList } from "../application/app-navigation/base-components/nav-list"
import type { NavItemType } from "../application/app-navigation/config"

interface SidebarNavigationSlimProps {
  /** URL of the currently active item. */
  activeUrl?: string
  /** List of items to display. */
  items: (NavItemType & { icon: FC<{ className?: string }> })[]
  /** List of footer items to display. */
  footerItems?: (NavItemType & { icon: FC<{ className?: string }> })[]
  /** Whether to hide the border. */
  hideBorder?: boolean
  /** Whether to hide the right side border. */
  hideRightBorder?: boolean
}

export const SidebarNavigationSlim = ({
  activeUrl,
  items,
  footerItems = [],
  hideBorder,
  hideRightBorder,
}: SidebarNavigationSlimProps) => {
  const activeItem = [...items, ...footerItems].find(
    (item) =>
      item.href === activeUrl ||
      item.items?.some((subItem) => subItem.href === activeUrl)
  )
  const [currentItem, setCurrentItem] = useState(activeItem || items[1])
  const [isHovering, setIsHovering] = useState(false)

  const isSecondarySidebarVisible =
    isHovering && Boolean(currentItem.items?.length)

  const MAIN_SIDEBAR_WIDTH = 68
  const SECONDARY_SIDEBAR_WIDTH = 268

  const mainSidebar = (
    <aside
      style={{
        width: MAIN_SIDEBAR_WIDTH,
      }}

      className="group flex h-full max-h-full max-w-full overflow-y-auto bg-primary py-1 pl-1"
    >
      <div
        className={cx(
          "flex w-auto flex-col justify-between rounded-xl bg-[#FBF7F5] pt-5 ring-1 ring-secondary transition duration-300 ring-inset",
          hideBorder && !isSecondarySidebarVisible && "ring-transparent"
        )}
      >
        <div className="flex justify-center px-3">
          {/* <UntitledLogoMinimal className="size-8" /> */}
          <a href="https://elevatelb.com">
            <svg
              className="size-8"
              xmlns="http://www.w3.org/2000/svg"
              width="56.467"
              height="36.521"
              viewBox="0 0 56.467 36.521"
            >
              <path
                d="M56.455,5.766a.821.821,0,0,0-.06-.184,1.067,1.067,0,0,0-.045-.114.8.8,0,0,0-.076-.1.8.8,0,0,0-.148-.158l0,0a.865.865,0,0,0-.569-.188h-.006l-10.98.627a.892.892,0,0,0-.834,1l.3,2.383a.893.893,0,0,0,1.127.747l4.976-1.406c-.479.344-.892.641-1.216.878Q33.468,20.279,24.709,24.659T8.466,29.039a1.854,1.854,0,0,1-1.181-2.017A8.9,8.9,0,0,1,8.86,22.79q1.572-2.607,2.264-2.609a1.766,1.766,0,0,1,1.083.3,2.57,2.57,0,0,0,2.412,1.476q1.624,0,6.693-2.51a44.517,44.517,0,0,0,9.7-6.6q4.625-4.083,4.626-7.333a5.186,5.186,0,0,0-2.018-3.642A6.342,6.342,0,0,0,29.238,0Q23.921,0,17.031,4.184A43.789,43.789,0,0,0,5.071,14.913Q0,21.463,0,27.268q0,9.253,7.58,9.253,6.4,0,16.537-5.463A127.41,127.41,0,0,0,42.083,19.49q6.105-4.759,10.435-8.8l-2.151,4.93a.892.892,0,0,0,.519,1.2l2.263.806a.893.893,0,0,0,1.175-.67L56.446,6.117a.948.948,0,0,0,.009-.351m-36.57,4.521q6.1-5.265,8.663-5.265c.393,0,.591.163.591.492q0,1.77-6.449,6.594t-8.613,4.824c-.2,0-.295-.066-.295-.2q0-1.18,6.1-6.448"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        <ul className="mt-4 flex flex-col gap-0.5 px-3">
          {items.map((item) => (
            <li key={item.label}>
              <NavButton
                // size="md"
                current={currentItem.href === item.href}
                href={item.href}
                label={item.label || ""}
                icon={item.icon}
                onClick={() => setCurrentItem(item)}
              />
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-4 px-3 py-5">
          {footerItems.length > 0 && (
            <ul className="flex flex-col gap-0.5">
              {footerItems.map((item) => (
                <li key={item.label}>
                  <NavButton
                    current={currentItem.href === item.href}
                    label={item.label || ""}
                    href={item.href}
                    icon={item.icon}
                    onClick={() => setCurrentItem(item)}
                  />
                </li>
              ))}
            </ul>
          )}

          <AriaDialogTrigger>
            {/* <AriaButton
              className={({ isPressed, isFocused }) =>
                cx(
                  "group relative inline-flex rounded-full",
                  (isPressed || isFocused) &&
                    "outline-focus-ring outline-2 outline-offset-2"
                )
              }
            >
              <Avatar
                status="online"
                src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                size="md"
                alt="Olivia Rhye"
              />
            </AriaButton> */}
            <AriaPopover
              placement="right bottom"
              offset={8}
              crossOffset={6}
              className={({ isEntering, isExiting }) =>
                cx(
                  "will-change-transform",
                  isEntering &&
                    "placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2 animate-in duration-300 ease-out fade-in",
                  isExiting &&
                    "placement-right:slide-out-to-left-2 placement-top:slide-out-to-bottom-2 placement-bottom:slide-out-to-top-2 animate-out duration-150 ease-in fade-out"
                )
              }
            >
              <NavAccountMenu />
            </AriaPopover>
          </AriaDialogTrigger>
        </div>
      </div>
    </aside>
  )

  const secondarySidebar = (
    <AnimatePresence initial={false}>
      {isSecondarySidebarVisible && (
        <motion.div
          initial={{ width: 0, borderColor: "var(--color-border-secondary)" }}
          animate={{
            width: SECONDARY_SIDEBAR_WIDTH,
            borderColor: "var(--color-border-secondary)",
          }}
          exit={{
            width: 0,
            borderColor: "rgba(0,0,0,0)",
            transition: { borderColor: { type: "tween", delay: 0.05 } },
          }}
          transition={{
            type: "spring",
            damping: 26,
            stiffness: 220,
            bounce: 0,
          }}
          className={cx(
            "relative h-full overflow-x-hidden overflow-y-auto bg-primary",
            !(hideBorder || hideRightBorder) && "box-content border-r-[1.5px]"
          )}
        >
          <div
            style={{ width: SECONDARY_SIDEBAR_WIDTH }}
            className="flex h-full flex-col px-4 pt-6"
          >
            <h3 className="text-brand-secondary text-sm font-semibold">
              {currentItem.label}
            </h3>
            <ul className="py-2">
              {currentItem.items?.map((item) => (
                <li key={item.label} className="py-0.5">
                  <NavItemBase
                    current={activeUrl === item.href}
                    href={item.href}
                    icon={item.icon}
                    badge={item.badge}
                    type="link"
                  >
                    {item.label}
                  </NavItemBase>
                </li>
              ))}
            </ul>
            <div className="sticky bottom-0 mt-auto flex justify-between border-t border-secondary bg-primary px-2 py-5">
              <div>
                <p className="text-sm font-semibold text-primary">
                  Olivia Rhye
                </p>
                <p className="text-tertiary text-sm">olivia@untitledui.com</p>
              </div>
              <div className="absolute top-2.5 right-0">
                <ButtonUtility
                  size="sm"
                  color="tertiary"
                  tooltip="Log out"
                  icon={LogOut01}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Desktop sidebar navigation */}
      <div
        className="z-50 hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex"
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
      >
        {mainSidebar}
        {secondarySidebar}
      </div>

      {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
      <div
        style={{
          paddingLeft: MAIN_SIDEBAR_WIDTH,
        }}
        className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
      />

      {/* Mobile header navigation */}
      <MobileNavigationHeader>
        <aside className="group flex h-full max-h-full w-full max-w-full flex-col justify-between overflow-y-auto bg-primary pt-4">
          <div className="px-4">
            <UntitledLogo className="h-8" />
          </div>

          <NavList items={items} />

          <div className="mt-auto flex flex-col gap-5 px-2 py-4">
            <div className="flex flex-col gap-2">
              <NavItemBase
                current={activeUrl === "/support"}
                type="link"
                href="/support"
                icon={LifeBuoy01}
              >
                Support
              </NavItemBase>
              <NavItemBase
                current={activeUrl === "/settings"}
                type="link"
                href="/settings"
                icon={Settings01}
              >
                Settings
              </NavItemBase>
            </div>

            <div className="relative flex items-center gap-3 border-t border-secondary pt-6 pr-8 pl-2">
              <AvatarLabelGroup
                status="online"
                size="md"
                src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                title="Olivia Rhye"
                subtitle="olivia@untitledui.com"
              />

              <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <Button
                  size="sm"
                  color="tertiary"
                  iconLeading={
                    <LogOut01 className="text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover size-5" />
                  }
                  className="p-1.5!"
                />
              </div>
            </div>
          </div>
        </aside>
      </MobileNavigationHeader>
    </>
  )
}
