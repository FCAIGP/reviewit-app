import React, {useState} from 'react'
import {InputTags} from 'react-bootstrap-tagsinput'
import 'react-bootstrap-tagsinput/dist/index.css'

function Tags(props) {

    const [tags, setTags] = useState([])
    const {setTagSearch} = props;
    return (
        <div>
        <InputTags placeholder="Type your tags here to filter reviews" values={tags} onTags={(value) => {
            setTags(value.values)
            setTagSearch(value.values)
            }} />
        </div>
    )
}

export default Tags
