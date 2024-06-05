import { StyledInput, Wrapper } from "./styled";

export const Input = ({
  placeholder,
  value,
  onChange = () => {},
  onClick,
  icon,
  iconPlacement = "left",
  main,
  bcolor,
  height,
  width,
  colorChange,
  dispabled,
  type = "text",
  error,
  borderColor,
  padding,
  borderRadius,
  secondaryIcon,
  autoFocus,
  onKeyDown,
  className,
  divClassName,
}) => {
  return (
    <Wrapper
      className={divClassName}
      borderRadius={borderRadius}
      width={width}
      colorChange={colorChange}
      main={main}
      bcolor={bcolor}
      height={height}
      error={error}
      borderColor={borderColor}
      padding={padding}
      onClick={onClick}
    >
      {iconPlacement === "left" && icon}
      <StyledInput
        className={className}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        height={height}
        main={main}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        dispabled={dispabled}
        type={type}
      />
      {iconPlacement === "right" && icon}
      {secondaryIcon}
    </Wrapper>
  );
};
