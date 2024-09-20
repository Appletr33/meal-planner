interface ShoppingListProps {
    items: Array<{
      name: string;
      quantity: string;
      estimatedPrice: number;
      storeSuggestions: string[];
    }>;
  }
  
  const ShoppingList: React.FC<ShoppingListProps> = ({ items }) => {

    if (!items) {
      return <div>Loading...</div>; // or handle missing data appropriately
    }

    return (
      <div>
        <h2>Your Shopping List</h2>
        <ul>
          {items.map((item) => (
            <li key={item.name}>
              <p>{item.name} - {item.quantity}</p>
              <p>Estimated Price: ${item.estimatedPrice.toFixed(2)}</p>
              <p>Available at: {item.storeSuggestions.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ShoppingList;