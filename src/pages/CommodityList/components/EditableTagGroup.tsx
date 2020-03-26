import { Component } from "react";
import { Tag, Input } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from 'rc-tween-one';

interface EditableTagGroupProps  {
    value:string[]
    onChange?: (tags: string[]) => void;
   
  }
  
export interface EditableTagGroupState {
    tags:string[],
    inputVisible:boolean, 
    inputValue:string
}
  

export default class EditableTagGroup extends Component<EditableTagGroupProps, EditableTagGroupState>  {

    constructor(props: EditableTagGroupProps) {
        super(props);
    
        this.state = {
            tags:props.value,
            inputVisible: false,
            inputValue: '',
        };
      }
      input:any
  
    handleClose = (removedTag:string) => {
      const tags = this.state.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.setState({ tags });
    };
  
    showInput = () => {
      this.setState({ inputVisible: true }, () => this.input.focus());
    };
  
    handleInputChange = (e:any) => {
      this.setState({ inputValue: e.target.value });
    };
  
    handleInputConfirm = () => {
      const { inputValue } = this.state;
      const {onChange} =this.props
      let { tags } = this.state;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
      });
      if(onChange){
        onChange(tags)
      }
    };
  
    saveInputRef = (input:any) => (this.input = input);
  
    forMap = (tag:any) => {
      const tagElem = (
        <Tag
          closable
          onClose={(e:any) => {
            e.preventDefault();
            this.handleClose(tag);
          }}
        >
          {tag}
        </Tag>
      );
      return (
        <span key={tag} style={{ display: 'inline-block' }}>
          {tagElem}
        </span>
      );
    };
  
    render() {
      const { tags, inputVisible, inputValue } = this.state;
      const tagChild = tags.map(this.forMap);
      return (
        <div>
          <div style={{ marginBottom: 16 }}>
            <TweenOneGroup
              enter={{
                scale: 0.8,
                opacity: 0,
                type: 'from',
                duration: 100,
                onComplete: e => {
                  e.target.style = '';
                },
              }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              appear={false}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag onClick={this.showInput} className="site-tag-plus">
              <PlusOutlined /> 创建标签
            </Tag>
          )}
        </div>
      );
    }
  }