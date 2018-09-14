import React, { Component } from 'react';

class PreviewTemplate extends Component {
  render() {
    return (
      <div className='previewContainer'>
        <div className="component-title">Template Preview</div>
        <div className='sticky'>
          {this.renderElements()}
        </div>
      </div>
    );
  }

  renderElements = () => {
    const { data, fieldInputs, listItems } = this.props;

    return data.map((node, index) => {
      switch (node.tagName) {
        case 'img':
          return (
            <div key={index} className='previewBox'>
              <img
                data-name={node.dataName}
                data-name2={node.dataName2}
                src={fieldInputs[node.dataName] ? fieldInputs[node.dataName] : '[' + node.dataName + ']'}
                alt={fieldInputs[node.dataName2] ? fieldInputs[node.dataName2] : '[' + node.dataName2 + ']'}
              />
            </div>
          );

        case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': case 'div':
          return (
            <div key={index} className='previewBox'>
              <div data-name={node.dataName}>
                {fieldInputs[node.dataName] ? fieldInputs[node.dataName] : '[' + node.dataName + ']'}
              </div>
            </div>
          );

        case 'p':
          return (
            <div key={index} className='previewBox'>
              <p data-name={node.dataName}>
                {fieldInputs[node.dataName] ? fieldInputs[node.dataName] : '[' + node.dataName + ']'}
              </p>
            </div>
          );

        case 'ul':
          return (
            <div key={index} className='previewBox'>
              <ul data-name={node.dataName}>
                {
                  listItems[node.dataName].length > 0 ?
                    listItems[node.dataName].map((item, index) => {
                      return <li key={index}>{item}</li>
                    })
                    : '[' + node.dataName + ']'
                }
              </ul>
            </div>
          );

        case 'ol':
          return (
            <div key={index} className='previewBox'>
              <ol data-name={node.dataName}>
                {
                  listItems[node.dataName].length > 0 ?
                    listItems[node.dataName].map((item, index) => {
                      return <li key={index}>{item}</li>
                    })
                    : '[' + node.dataName + ']'
                }
              </ol>
            </div>
          );

        case 'a':
          return (
            < div key={index} className='previewBox' >
              <a
                data-name={node.dataName}
                data-name2={node.dataName2}
                href={fieldInputs[node.dataName2]}
                target="_blank"
              >
                {fieldInputs[node.dataName] ? fieldInputs[node.dataName] : '[' + node.dataName + ']'}
              </a>
            </div >
          );
        default:
          return null;
      }
    });
  }

}

export default PreviewTemplate;