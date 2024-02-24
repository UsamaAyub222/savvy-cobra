"use client"

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

function CopyToClipboardButton({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    if(!textToCopy) {
      console.error('textToCopy is undefined or empty');
      return;
    }
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => console.error('Copy failed!', err));
  };

  return (
    <button onClick={handleCopyClick} onTouchEnd={handleCopyClick}>
      {isCopied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
    </button>
  );
}

export default CopyToClipboardButton;
