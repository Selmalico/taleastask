import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = ({ ...rest }) => (
  <ContentLoader
    width={1000}
    height={500}
    viewBox="0 0 1000 500"
    backgroundColor="#999999"
    foregroundColor="#ecebeb"
    speed={5}
    {...rest}
    style={{ animation: "showLoader 6s infinite" }}
  >
    {/* First card */}
    <rect x="20" y="20" rx="4" ry="4" width="350" height="25" />
    <rect x="20" y="60" rx="2" ry="2" width="350" height="150" />
    <rect x="20" y="230" rx="2" ry="2" width="170" height="20" />
    <rect x="65" y="230" rx="2" ry="2" width="170" height="20" />

    {/* Second card */}
    <rect x="380" y="20" rx="4" ry="4" width="350" height="25" />
    <rect x="380" y="60" rx="2" ry="2" width="350" height="150" />
    <rect x="380" y="230" rx="2" ry="2" width="170" height="20" />
    <rect x="425" y="230" rx="2" ry="2" width="170" height="20" />

    {/* Third card */}
    <rect x="740" y="20" rx="4" ry="4" width="350" height="25" />
    <rect x="740" y="60" rx="2" ry="2" width="350" height="150" />
    <rect x="740" y="230" rx="2" ry="2" width="170" height="20" />
    <rect x="785" y="230" rx="2" ry="2" width="170" height="20" />

     {/* Fourth card */}
     <rect x="20" y="280" rx="4" ry="4" width="350" height="25" />
    <rect x="20" y="320" rx="2" ry="2" width="350" height="150" />
    <rect x="20" y="490" rx="2" ry="2" width="170" height="20" />
    <rect x="65" y="490" rx="2" ry="2" width="170" height="20" />

    {/* Fifth card */}
    <rect x="380" y="280" rx="4" ry="4" width="350" height="25" />
    <rect x="380" y="320" rx="2" ry="2" width="350" height="150" />
    <rect x="380" y="490" rx="2" ry="2" width="170" height="20" />
    <rect x="425" y="490" rx="2" ry="2" width="170" height="20" />

    {/* Sixth card */}
    <rect x="740" y="280" rx="4" ry="4" width="350" height="25" />
    <rect x="740" y="320" rx="2" ry="2" width="350" height="150" />
    <rect x="740" y="490" rx="2" ry="2" width="170" height="20" />
    <rect x="785" y="490" rx="2" ry="2" width="170" height="20" />

  </ContentLoader>
)



export default MyLoader;