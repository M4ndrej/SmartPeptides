import { FC } from "react";
import LinkComponent from "../LinkComponent/LinkComponent";
import classNames from "classnames";

interface NavigationUsefulLinksProps {
  closePopover?: () => void;
  username?: string;
  inFooter?: boolean;
}

const NavigationUsefulLinks: FC<NavigationUsefulLinksProps> = ({
  closePopover,
  username,
  inFooter,
}) => {
  const functionIsNotUndefinedCheck = closePopover !== undefined;
  return (
    <>
      <p
        className={classNames({
          "font-D18px-M14px mb-2 font-bold !text-textWhite": !inFooter,
          "font-18px-ALL mb-2 font-bold": inFooter,
        })}
      >
        Useful links
      </p>
      {username ? (
        <LinkComponent
          goTo="/profile"
          closeSidebar={() =>
            !inFooter && functionIsNotUndefinedCheck && closePopover()
          }
          linkTitle="Profile"
          usefulLink
          inFooter={inFooter}
        />
      ) : (
        <>
          {inFooter && (
            <LinkComponent
              goTo="/sign-in"
              closeSidebar={() =>
                !inFooter && functionIsNotUndefinedCheck && closePopover()
              }
              linkTitle="Login"
              usefulLink
              inFooter={inFooter}
            />
          )}

          {inFooter && (
            <LinkComponent
              goTo="/sign-in"
              closeSidebar={() =>
                !inFooter && functionIsNotUndefinedCheck && closePopover()
              }
              linkTitle="Register"
              usefulLink
              inFooter={inFooter}
            />
          )}
        </>
      )}

      <LinkComponent
        goTo="/about"
        closeSidebar={() =>
          !inFooter && functionIsNotUndefinedCheck && closePopover()
        }
        linkTitle="About Us"
        usefulLink
        inFooter={inFooter}
      />

      <LinkComponent
        goTo="/privacy"
        closeSidebar={() =>
          !inFooter && functionIsNotUndefinedCheck && closePopover()
        }
        linkTitle="Privacy Policy"
        usefulLink
        inFooter={inFooter}
      />

      <LinkComponent
        goTo="/refunds"
        closeSidebar={() =>
          !inFooter && functionIsNotUndefinedCheck && closePopover()
        }
        linkTitle="Refund and Return Policy"
        usefulLink
        inFooter={inFooter}
      />

      <LinkComponent
        goTo="/terms"
        closeSidebar={() =>
          !inFooter && functionIsNotUndefinedCheck && closePopover()
        }
        linkTitle="Terms of Service"
        usefulLink
        inFooter={inFooter}
      />

      <LinkComponent
        goTo="/shipping"
        closeSidebar={() =>
          !inFooter && functionIsNotUndefinedCheck && closePopover()
        }
        linkTitle="Shipping"
        usefulLink
        inFooter={inFooter}
      />

      <LinkComponent
        goTo="/tracking"
        closeSidebar={() =>
          !inFooter && functionIsNotUndefinedCheck && closePopover()
        }
        linkTitle="Order Tracking"
        usefulLink
        inFooter={inFooter}
      />

      {/*   <LinkComponent
        goTo="/discount"
        closeSidebar={() =>
          !inFooter && functionIsNotUndefinedCheck && closePopover()
        }
        linkTitle="Discounts"
        usefulLink
        inFooter={inFooter}
      /> */}
    </>
  );
};

export default NavigationUsefulLinks;
