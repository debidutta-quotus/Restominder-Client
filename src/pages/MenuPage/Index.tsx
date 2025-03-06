import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import './Menu.css';
import MenuCard from './components/MenuCard';
import EditMenu from './Modals/EditMenu';
// import { initialFoodItems } from '../../assets/DummyData/MockMenuItems';
import veg from '../../assets/veg.png';
import nonVeg from '../../assets/non_veg.png';
import AddMenu from './Modals/AddMenu';
import ConfirmationModal from '../../utils/Modal/ConfirmationModal'; // Import ConfirmationModal
// import { deleteMenuItem } from './Services/DeleteMenu';
import { CategoryGroup, FoodItem } from '../../Types/Menu/Index';
import { getMenuItems } from './API/getMenuItemsAPI';
import { PacmanLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { deleteMenu } from './API/deleteMenuItemAPI';

const MenuService: React.FC = () => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // State for modal
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState('');
  const [isGettingMenuLoading, setIsGettingMenuLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsGettingMenuLoading(true);
        const items = await getMenuItems(); // Fetch menu items
        setFoodItems(items); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setIsGettingMenuLoading(false);
      }
    };

    fetchData();
  }, [foodItems.length]);

  // Group items by category
  const itemsByCategory: CategoryGroup = foodItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as CategoryGroup);

  const handleAddMenuItem = (newItemFormData: FoodItem) => {
    const newItem: FoodItem = {
      ...newItemFormData,
      _id: String(Date.now()), // Replace with your ID generation logic
      storeId: "store001",
      available: true,
    };

    setFoodItems([...foodItems, newItem]);
    setShowAddMenu(false);
  };

  const handleEditClick = (item: FoodItem) => {
    setSelectedItem(item);
    console.log("item clicked is - ", item);
    setShowEditMenu(true);
  };

  const handleDeleteClick = (item: FoodItem) => {
    setSelectedItem(item);
    console.log("item clicked to delete in MENU is - ", item);
    setDeleteConfirmationMessage(`Are you sure you want to delete "${item.name}"?`);
    setConfirmationModalOpen(true); // Open the modal
    console.log("item clicked to delete is - ", item);
  };

  const handleEditSubmit = (updatedItem: FoodItem) => {
    // Ensure we have the required properties from the original item
    const completeItem: FoodItem = {
      ...updatedItem,
      _id: selectedItem?._id || '',
      storeId: selectedItem?.storeId || ''
    };

    setFoodItems(foodItems.map(item =>
      item._id === completeItem._id ? completeItem : item
    ));
    setShowEditMenu(false);
  };

  const handleDeleteItem = async () => {
    if (selectedItem) {
      const success = await deleteMenu(selectedItem);
      if (success) {
        setFoodItems((prevItems) => prevItems.filter((item) => item._id !== selectedItem._id));

        setSelectedItem(null);
        setConfirmationModalOpen(false); // Close the modal
        setDeleteConfirmationMessage('');
        navigate("/menu")
      } else {
        console.log("Failed to delete item");
      }
    }
  };

  const handleCloseDeleteMenu = () => {
    setConfirmationModalOpen(false); // Close the modal
    setSelectedItem(null);
    setDeleteConfirmationMessage('');
  };

  return (
    <div className="menu-service-container">
      <header className="menu-service-header">
        <div className="menu-service-header-content">
          <h1 className="menu-service-title">Manage Menu Items</h1>
          <div className="menu-service-menu-actions">
            <div className="menu-service-menu-legend">
              <span className="menu-service-legend-item">
                <div className='menu-service-veg-non-veg-logo-image-container'>
                  <img src={veg} className='menu-service-veg-non-veg-logo-image' alt="Vegetarian" />
                </div>
                Veg
              </span>
              <span className="menu-service-legend-item">
                <div className='menu-service-veg-non-veg-logo-image-container'>
                  <img src={nonVeg} className='menu-service-veg-non-veg-logo-image' alt="Non-vegetarian" />
                </div>
                Non-veg
              </span>
            </div>
            <button
              className="menu-service-add-menu-button"
              onClick={() => setShowAddMenu(true)}
            >
              <PlusCircle size={20} />
              <span>Add Menu Item</span>
            </button>
          </div>
        </div>
      </header>

      <div className="menu-service-wrapper">
        {isGettingMenuLoading ? (
          <div className='menu-service-loading'>
            <PacmanLoader
              color="#434343"
              margin={2}
              size={25}
              speedMultiplier={1}
            />
          </div>
        ) : Object.keys(itemsByCategory).length === 0 ? (
          <div className="menu-service-empty-menu-state">
            <p>No menu items yet. Add your first item!</p>
            <button
              className="menu-service-add-menu-button"
              onClick={() => setShowAddMenu(true)}
            >
              <PlusCircle size={20} />
              <span>Add Menu Item</span>
            </button>
          </div>
        ) : (
          Object.entries(itemsByCategory).map(([category, items]) => (
            <div key={category} className="menu-service-section menu-service-fade-in">
              <h2 className="menu-service-section-title">{category}</h2>
              <div className="menu-service-grid">
                {items.map((item) => (
                  <MenuCard
                    key={item._id}
                    {...item}
                    onEditClick={() => handleEditClick(item)}
                    onDeleteClick={() => handleDeleteClick(item)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>



      {showAddMenu && (
        <AddMenu
          onClose={() => setShowAddMenu(false)}
          onSubmit={handleAddMenuItem}
        />
      )}

      {showEditMenu && selectedItem && (
        <EditMenu
          onClose={() => setShowEditMenu(false)}
          onSubmit={handleEditSubmit}
          menuItem={selectedItem}
        />
      )}

      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onRequestClose={handleCloseDeleteMenu}
        message={deleteConfirmationMessage}
        onConfirm={handleDeleteItem}
        onCancel={handleCloseDeleteMenu}
      />
    </div>
  );
};

export default MenuService;