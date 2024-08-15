import { useMemo } from "react";
import PropTypes from "prop-types";

const ProfileEditor = ({
  className = "",
  exclude,
  exclude1,
  vector,
  editProfileHeaderWidth,
  backIconFlex,
  backIconGap,
  back,
  editMyProfile,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      width: editProfileHeaderWidth,
    };
  }, [editProfileHeaderWidth]);

  const editProfileHeaderStyle = useMemo(() => {
    return {
      flex: backIconFlex,
      gap: backIconGap,
    };
  }, [backIconFlex, backIconGap]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[23px] text-center text-xl text-font-white font-aldrich ${className}`}
    >
      <header className="self-stretch [backdrop-filter:blur(20px)] flex flex-row items-start justify-between pt-[13px] pb-[11px] pl-[21px] pr-6 gap-5 text-center text-mini text-font-white font-m-16">
        <div className="w-[54px] relative tracking-[-0.24px] leading-[20px] font-medium inline-block shrink-0">
          9:41
        </div>
        <div className="w-[66.7px] flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border">
          <div className="self-stretch h-[11.4px] flex flex-row items-end justify-start gap-[4.9px]">
            <img
              className="h-[10.7px] w-[17px] relative"
              loading="lazy"
              alt=""
              src={exclude}
            />
            <img
              className="h-[11px] w-[15.3px] relative"
              loading="lazy"
              alt=""
              src={exclude1}
            />
            <div className="h-[11px] w-[24.7px] relative">
              <img
                className="absolute h-[36.36%] w-[5.26%] top-[36.36%] right-[0.4%] bottom-[27.27%] left-[94.33%] max-w-full overflow-hidden max-h-full mix-blend-normal"
                loading="lazy"
                alt=""
                src={vector}
              />
              <div className="absolute h-full w-[89.07%] top-[0%] right-[10.93%] bottom-[0%] left-[0%] rounded-[2.67px] border-font-white border-[1px] border-solid box-border opacity-[0.35] mix-blend-normal" />
              <div className="absolute h-[63.64%] w-[72.87%] top-[18.18%] right-[19.03%] bottom-[18.18%] left-[8.1%] rounded-[1.33px] bg-font-white z-[1]" />
            </div>
          </div>
        </div>
      </header>
      <div
        className="w-[289px] flex flex-row items-start justify-start py-0 px-[25px] box-border"
        style={frameDivStyle}
      >
        <div
          className="flex-1 flex flex-row items-start justify-between gap-5"
          style={editProfileHeaderStyle}
        >
          <img
            className="h-10 w-10 relative"
            loading="lazy"
            alt=""
            src={back}
          />
          <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0">
            <h1 className="m-0 relative text-inherit leading-[140%] font-normal font-[inherit] whitespace-nowrap">
              {editMyProfile}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileEditor.propTypes = {
  className: PropTypes.string,
  exclude: PropTypes.string,
  exclude1: PropTypes.string,
  vector: PropTypes.string,
  back: PropTypes.string,
  editMyProfile: PropTypes.string,

  /** Style props */
  editProfileHeaderWidth: PropTypes.any,
  backIconFlex: PropTypes.any,
  backIconGap: PropTypes.any,
};

export default ProfileEditor;