interface InputProps {
  labelValue: string;
  textButton: string;

}
export const Input = (props:InputProps) => {
  return (
    <div>
      <label>{props.labelValue}</label>
      <input type="text" placeholder="ingrese el codigo aqui" />
      <button>{props.textButton}</button>
    </div>
  )
}