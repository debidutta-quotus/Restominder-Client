import React from 'react';
import './BackgroundPage.css';

const BackgroundPage: React.FC = () => {
  return (
    <div className="background-page-container">
      <div className="background-page-vector-background">
        {/* First set of vectors */}
        <div className="background-page-vector background-page-vector1"></div>
        <div className="background-page-vector background-page-vector2"></div>
        <div className="background-page-vector background-page-vector3"></div>
        <div className="background-page-vector background-page-vector4"></div>
        <div className="background-page-vector background-page-vector5"></div>
        <div className="background-page-vector background-page-vector6"></div>
        <div className="background-page-vector background-page-vector7"></div>
        <div className="background-page-vector background-page-vector8"></div>
        
        {/* Additional vectors with different positions */}
        <div className="background-page-vector background-page-vector1 background-page-alt1"></div>
        <div className="background-page-vector background-page-vector2 background-page-alt1"></div>
        <div className="background-page-vector background-page-vector3 background-page-alt1"></div>
        <div className="background-page-vector background-page-vector4 background-page-alt1"></div>
        <div className="background-page-vector background-page-vector5 background-page-alt1"></div>
        <div className="background-page-vector background-page-vector6 background-page-alt1"></div>
        <div className="background-page-vector background-page-vector7 background-page-alt1"></div>
        <div className="background-page-vector background-page-vector8 background-page-alt1"></div>
        
        {/* More vectors with different positions */}
        <div className="background-page-vector background-page-vector1 background-page-alt2"></div>
        <div className="background-page-vector background-page-vector2 background-page-alt2"></div>
        <div className="background-page-vector background-page-vector3 background-page-alt2"></div>
        <div className="background-page-vector background-page-vector4 background-page-alt2"></div>
        <div className="background-page-vector background-page-vector5 background-page-alt2"></div>
        <div className="background-page-vector background-page-vector6 background-page-alt2"></div>
        <div className="background-page-vector background-page-vector7 background-page-alt2"></div>
        <div className="background-page-vector background-page-vector8 background-page-alt2"></div>
        
        {/* Additional set for more density */}
        <div className="background-page-vector background-page-vector1 background-page-alt3"></div>
        <div className="background-page-vector background-page-vector2 background-page-alt3"></div>
        <div className="background-page-vector background-page-vector3 background-page-alt3"></div>
        <div className="background-page-vector background-page-vector4 background-page-alt3"></div>
        <div className="background-page-vector background-page-vector5 background-page-alt3"></div>
        <div className="background-page-vector background-page-vector6 background-page-alt3"></div>
        <div className="background-page-vector background-page-vector7 background-page-alt3"></div>
        <div className="background-page-vector background-page-vector8 background-page-alt3"></div>
        
        {/* Even more vectors for maximum density */}
        <div className="background-page-vector background-page-vector1 background-page-alt4"></div>
        <div className="background-page-vector background-page-vector2 background-page-alt4"></div>
        <div className="background-page-vector background-page-vector3 background-page-alt4"></div>
        <div className="background-page-vector background-page-vector4 background-page-alt4"></div>
        <div className="background-page-vector background-page-vector5 background-page-alt4"></div>
        <div className="background-page-vector background-page-vector6 background-page-alt4"></div>
        <div className="background-page-vector background-page-vector7 background-page-alt4"></div>
        <div className="background-page-vector background-page-vector8 background-page-alt4"></div>
        
        {/* Corner vectors - top left */}
        <div className="background-page-vector background-page-vector1 background-page-corner-tl"></div>
        <div className="background-page-vector background-page-vector2 background-page-corner-tl"></div>
        <div className="background-page-vector background-page-vector3 background-page-corner-tl"></div>
        
        {/* Corner vectors - top right */}
        <div className="background-page-vector background-page-vector4 background-page-corner-tr"></div>
        <div className="background-page-vector background-page-vector5 background-page-corner-tr"></div>
        <div className="background-page-vector background-page-vector6 background-page-corner-tr"></div>
        
        {/* Corner vectors - bottom left */}
        <div className="background-page-vector background-page-vector7 background-page-corner-bl"></div>
        <div className="background-page-vector background-page-vector8 background-page-corner-bl"></div>
        <div className="background-page-vector background-page-vector1 background-page-corner-bl"></div>
        
        {/* Corner vectors - bottom right */}
        <div className="background-page-vector background-page-vector2 background-page-corner-br"></div>
        <div className="background-page-vector background-page-vector3 background-page-corner-br"></div>
        <div className="background-page-vector background-page-vector4 background-page-corner-br"></div>
        
        {/* Additional edge vectors - top edge */}
        <div className="background-page-vector background-page-vector5 background-page-edge-top"></div>
        <div className="background-page-vector background-page-vector6 background-page-edge-top"></div>
        <div className="background-page-vector background-page-vector7 background-page-edge-top"></div>
        
        {/* Additional edge vectors - bottom edge */}
        <div className="background-page-vector background-page-vector8 background-page-edge-bottom"></div>
        <div className="background-page-vector background-page-vector1 background-page-edge-bottom"></div>
        <div className="background-page-vector background-page-vector2 background-page-edge-bottom"></div>
        
        {/* Additional edge vectors - left edge */}
        <div className="background-page-vector background-page-vector3 background-page-edge-left"></div>
        <div className="background-page-vector background-page-vector4 background-page-edge-left"></div>
        <div className="background-page-vector background-page-vector5 background-page-edge-left"></div>
        
        {/* Additional edge vectors - right edge */}
        <div className="background-page-vector background-page-vector6 background-page-edge-right"></div>
        <div className="background-page-vector background-page-vector7 background-page-edge-right"></div>
        <div className="background-page-vector background-page-vector8 background-page-edge-right"></div>
        
        {/* Clear center area for logo and text */}
        <div className="background-page-clear-center"></div>
        
        {/* Center content placeholder - this would be replaced with your actual content */}
        <div className="background-page-center-content">
          {/* Your logo and text would go here */}
        </div>
      </div>
    </div>
  );
};

export default BackgroundPage;