export default function Textinput(props){
    return(
        <div className="mt-2 w-full">
            <label className="text-sm font-medium text-left py-2">
                {props.label}
            </label>
            <input
                className="border border-slate-200 rounded w-full px-2 py-1" 
                {...props}
            />
        </div>
    )
}