
function HeaderTitle (props) {
    return (
        <div className="d-flex my-2 align-items-center">
            <h4 className="text-nowrap mb-0 mx-2">{ props.title }</h4>
            <hr className="w-100 border border-2 border-dark opacity-100" />
        </div>
    )
}

export default HeaderTitle;