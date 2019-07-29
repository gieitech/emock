class Examspace extends React.Component{
    style = {
        single_product:{

        },
        questions_list:{

        },
        single_product:{

            
        }

    }
    render = ()=>{
        const {
            information_bar,
            questions_list,
            single_product,

        } = this.style;
        return(
            <div style={examination}>
                <div style={information_bar}>

                </div>
                <div style={questions_list}>


                </div>
                <div style={single_product}>

                </div>

            </div>
        );
    }
}