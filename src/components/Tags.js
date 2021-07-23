import React, {useState} from 'react'
import {InputTags} from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'

function Tags(props) {

    const [tags, setTags] = useState([])
    const {setTagSearch, values} = props;
    return (
        <div>
        <InputTags values={values.length === 0 ? tags : values} onTags={(value) => {
            setTags(value.values)
            setTagSearch(value.values)
            }} />
        </div>
    )
}

export default Tags
