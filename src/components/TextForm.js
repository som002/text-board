import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TextForm({ heading = '{text heading}', mode, showAlert }) {
  const [text, setText] = useState('');

  async function copySelectedText() {
    const selectedArea = document.getElementById('myBox');

    try {
      if (window.getSelection().toString() !== '') {
        await navigator.clipboard.writeText(window.getSelection().toString());
        console.log('Text copied to clipboard');
      } else {
        await navigator.clipboard.writeText(selectedArea.value);
        selectedArea.select();
        selectedArea.setSelectionRange(0, 9999);
        console.log('Text copied to clipboard');
      }
    } catch (err) {
      showAlert(`Failed to copy text:  ${err}`, 'danger');
      console.error('Failed to copy text: ', err);
    }
  }

  function downloadText(text) {
    const downBtn = document.getElementById('download');
    const attr = document.createAttribute('disabled');
    downBtn.setAttributeNode(attr);

    console.log(text);
    const filename = 'text_1.txt';
    let blob = new Blob([text], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob, { encoding: 'utf8' });
    downloadLink.download = filename;
    // downBtn.appendChild(downloadLink);
    downloadLink.click();
    // downBtn.removeChild(downloadLink);

    setTimeout(() => {
      // downBtn.hasAttribute('disabled') ? downBtn.removeAttributeNode('disabled') : downBtn.setAttributeNode('disabled');
      downBtn.removeAttributeNode(downBtn.getAttributeNode('disabled'));
      console.log('enabling download');
    }, 3000);
  }
  function handleOnClick() {
    document.getElementById('myBox').focus();
    switch (this) {
      case 'upper':
        setText(text.toUpperCase());
        showAlert('Uppercase Applied', 'info');
        break;
      case 'lower':
        setText(text.toLowerCase());
        showAlert('Lowercase Applied', 'info');
        break;
      case 'whiteSpace':
        setText(text.replace(/\s+/gi, ' '));
        showAlert('Extra WhiteSpaces Removed', 'info');
        break;
      case 'clear':
        setText('');
        showAlert('TextField Cleared', 'danger');
        break;
      case 'download':
        downloadText(text);
        showAlert(`File Downloaded ⬇️`, 'success');
        break;
      case 'copy':
        copySelectedText();
        showAlert('Text copied to clipboard', 'info');
        break;
      default:
        console.error('Invalid Error');
        showAlert('An Error Occurred', 'danger');
    }
  }
  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <h1 className={`text-${mode === 'light' ? 'dark' : 'white'}`}>{heading}</h1>
      <div className="mb-3">
        <label htmlFor="myBox" className="form-label">
          🤖
        </label>
        <textarea
          data-toggle="tooltip"
          data-placement="right"
          title={text.length === 0 ? `write something` : `select text to copy`}
          type="text"
          className="form-control focus-ring py-3"
          id="myBox"
          value={text}
          onChange={handleOnChange}
          rows="8"
          placeholder="Your text here"
        ></textarea>
      </div>
      <div className="d-flex p-2 justify-content-sm-center flex-wrap">
        <button className="btn btn-primary mx-2 my-1" onClick={handleOnClick.bind('upper')}>
          UPPERCASE
        </button>

        <button className="btn btn-secondary mx-2 my-1" onClick={handleOnClick.bind('lower')}>
          Lowercase
        </button>
        <button className="btn btn-secondary mx-2 my-1" onClick={handleOnClick.bind('whiteSpace')}>
          {<b>Extra whiteSpace</b>}
        </button>
        <button className="btn btn-danger mx-2 my-1 " onClick={handleOnClick.bind('clear')}>
          {<i>Clear</i>}
        </button>
        <button className="btn btn-outline-success mx-2 my-1 " onClick={handleOnClick.bind('copy')}>
          {<i>Copy</i>}
        </button>
        <button
          className="btn btn-primary mx-2 my-1 py-2 text-md-start text-center"
          id="download"
          onMouseUp={handleOnClick.bind('download')}
        >
          {<b>&#8681;</b>}
        </button>
      </div>
      <div className={`container text-${mode === 'light' ? 'dark' : 'light'}`}>
        <h1>Your text summary</h1>
        <p>
          {text.length === 0 ? 0 : text.trim().split(' ').length} {text.trim().split(' ').length > 1 ? 'words' : 'word'}{' '}
          and {text.length} characters
        </p>
        <p>{text.length === 0 ? 0 : text.trim().split(' ').length * 0.218} seconds read</p>

        <h2>Preview</h2>
        <p className="text-secondary bg-light p-1">{text.length > 0 ? text : 'Write something to view the preview'}</p>
      </div>
    </>
  );
}

TextForm.propTypes = {
  heading: PropTypes.string,
};
