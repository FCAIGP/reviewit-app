import React from 'react'
import {Container,List,Segment, Image} from 'semantic-ui-react'

function ReviewItFooter() {

    return (
        <div>
            <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em'}}>
                <Container textAlign='center'>
                    <Image centered size='mini' src='https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/public/logo.png?raw=true' />
                    <List horizontal inverted divided link size='small'>
                        <List.Item as='a' href='#'>
                            Contact Us
                        </List.Item>
                        <List.Item as='a' href='#'>
                            Terms and Conditions
                        </List.Item>
                        <List.Item as='a' href='#'>
                            Privacy Policy
                        </List.Item>
                    </List>
                    <p className="ui center aligned tiny grey header">&copy; 2021 ReviewIt. All rights reserverd.</p>
                </Container>
            </Segment>
        </div>
    )
}

export default ReviewItFooter
