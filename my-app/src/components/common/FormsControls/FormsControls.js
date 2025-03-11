import classes from './FormsControls.module.css'

export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <div>
                <textarea {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <div>
                <input {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}


export function FormControl(Component) {
    function ComponentWithRouterProp({ input, meta, ...props }) {
        const hasError = meta.touched && meta.error
        return (
            <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
                <div>
                    <Component {...input} {...props} />
                </div>
                {hasError && <span>{meta.error}</span>}
            </div>
        )
    }

    return ComponentWithRouterProp;
} 

