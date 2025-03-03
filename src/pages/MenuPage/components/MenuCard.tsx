import React, { useState } from "react";
import {
  Clock,
  Tag,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import "./MenuCard.css";
import veg from "../../../assets/veg.png";
import nonVeg from "../../../assets/non_veg.png";
import { BeatLoader } from 'react-spinners';

interface FoodItem {
  _id: string;
  storeId: string;
  itemName: string;
  description: string;
  price: number;
  availability: boolean;
  minPrepTime: number;
  maxPrepTime: number;
  maxPossibleOrders: number;
  images: string[];
  tags: string[];
  category: string;
  isVeg: boolean;
}

interface MenuCardProps extends FoodItem {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  // _id,
  itemName,
  description,
  price,
  availability: initialAvailability,
  minPrepTime,
  maxPrepTime,
  // maxPossibleOrders,
  images,
  tags,
  category,
  isVeg,
  onEditClick,
  onDeleteClick
}) => {
  const [availability, setAvailability] = useState(initialAvailability);
  const [availabilityLoding, setAvailabilityLoading] = useState(false);

  const toggleAvailability = () => {
    setAvailabilityLoading(true);
    setTimeout(() => {
      setAvailability(!availability);
      setAvailabilityLoading(false);
    }, 3000);
  };

  return (
    <div
      className={`food-card ${!availability ? "food-card--unavailable" : ""}`}
    >
      <div className="food-card__image">
        <img src={images[0]} alt={itemName} />
      </div>
      <div className="food-card__content">
        <div className="food-card__main-info">
          <div className="food-card__header">
            <div className="food-card__title-section">
              <div className="food-card__title-wrapper">
                <div className="food-card__diet-indicator-container">
                  <div className="food-card-veg-non-veg-img-container">
                    <img
                      src={isVeg ? veg : nonVeg}
                      alt={isVeg ? "Vegetarian" : "Non-vegetarian"}
                      className="food-card__diet-indicator"
                    />
                  </div>
                </div>
                <h2 className="food-card__title">{itemName}</h2>
              </div>
              <span className="food-card__category">{category}</span>
            </div>
            <div className="food-card__actions">
              <button
                className="food-card__action-btn food-card__action-btn--edit"
                onClick={onEditClick}
                title="Edit item"
              >
                <Edit2 size={16} />
              </button>
              <button
                className="food-card__action-btn food-card__action-btn--delete"
                onClick={onDeleteClick}
                title="Delete item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <p className="food-card__description">{description}</p>
        </div>

        <div className="food-card__details">
          <div className="food-card__meta">
            <div className="food-card__prep-time">
              <Clock size={14} />
              <span>
                {minPrepTime}-{maxPrepTime} mins
              </span>
            </div>
            <div className="food-card__price">${price.toFixed(2)}</div>
            <button
              className={`food-card__toggle ${!availability ? "food-card__toggle--off" : ""}`}
              onClick={toggleAvailability}
              title={availability ? "Mark as unavailable" : "Mark as available"}
            >
              {availabilityLoding ? (
                <BeatLoader
                  margin={6}
                  size={10}
                /> // Use ClipLoader
              ) : availability ? (
                <>
                  <ToggleRight size={20} />
                  <span>Available</span>
                </>
              ) : (
                <>
                  <ToggleLeft size={20} />
                  <span>Unavailable</span>
                </>
              )}
            </button>
          </div>
          <div className="food-card__tags">
            {tags.map((tag, index) => (
              <span key={index} className="food-card__tag">
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;