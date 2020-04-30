import React from 'react';
import { Item, Icon, Label } from 'semantic-ui-react';

const setText = (text) => (
  text.length > 380 ? text.substr(0, 380) + '...' : text
);
const Post = (props) => {
  return (
    <Item>
      <Item.Image src={props.image} />
      <Item.Content>
        <Item.Header as='a'>{props.title}</Item.Header>
        <Item.Description>{setText(props.text)}</Item.Description>
        <Item.Extra>
          <Label icon='eye' content={`Просмотров: ${props.views}`} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default Post;
