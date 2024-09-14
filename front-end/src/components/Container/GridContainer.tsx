import React from 'react';

import './styles.css';

interface Props {
  children: React.ReactNode;
}

export default function GridContainer( { children }: Props ) {
  return (
    <div className="grid-content">
      { children }
    </div> );
}