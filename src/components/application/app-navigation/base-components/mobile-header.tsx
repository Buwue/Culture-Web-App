import type { PropsWithChildren } from "react"
import { X as CloseIcon, Menu02 } from "@untitledui/icons"
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
} from "react-aria-components"
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo"
import { cx } from "@/lib/utils/cx"

export const MobileNavigationHeader = ({ children }: PropsWithChildren) => {
  return (
    <AriaDialogTrigger>
      <header className="fixed z-40 flex h-14 w-full items-center justify-between border-b border-secondary bg-[#FBF7F5] p-3 pl-4 lg:hidden">
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
        <AriaButton
          aria-label="Expand navigation menu"
          className="group text-fg-secondary outline-focus-ring hover:bg-primary_hover hover:text-fg-secondary_hover flex items-center justify-center rounded-lg bg-primary p-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Menu02 className="size-6 transition duration-200 ease-in-out group-aria-expanded:opacity-0" />
          <CloseIcon className="absolute size-6 opacity-0 transition duration-200 ease-in-out group-aria-expanded:opacity-100" />
        </AriaButton>
      </header>

      <AriaModalOverlay
        isDismissable
        className={({ isEntering, isExiting }) =>
          cx(
            "bg-overlay/70 fixed inset-0 z-50 cursor-pointer backdrop-blur-md lg:hidden",
            isEntering && "animate-in duration-300 ease-in-out fade-in",
            isExiting && "animate-out duration-200 ease-in-out fade-out"
          )
        }
      >
        {({ state }) => (
          <>
            <AriaButton
              aria-label="Close navigation menu"
              onPress={() => state.close()}
              className="text-fg-white/70 outline-focus-ring hover:text-fg-white fixed top-2.5 right-3 flex cursor-pointer items-center justify-center rounded-lg p-2 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <CloseIcon className="size-6" />
            </AriaButton>

            <AriaModal
              className={({ isEntering, isExiting }) =>
                cx(
                  "w-full cursor-auto will-change-transform",
                  isEntering &&
                    "animate-in duration-300 ease-in-out slide-in-from-top",
                  isExiting &&
                    "animate-out duration-200 ease-in-out slide-out-to-top"
                )
              }
            >
              <AriaDialog className="max-h-[80dvh] outline-hidden focus:outline-hidden">
                {children}
              </AriaDialog>
            </AriaModal>
          </>
        )}
      </AriaModalOverlay>
    </AriaDialogTrigger>
  )
}
