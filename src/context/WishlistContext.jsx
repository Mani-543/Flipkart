import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist =
        localStorage.getItem("shopkart_wishlist");

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "shopkart_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item._id === productId
    );
  };

  const addToWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const exists = previousWishlist.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return previousWishlist;
      }

      return [
        ...previousWishlist,
        product,
      ];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((previousWishlist) =>
      previousWishlist.filter(
        (item) => item._id !== productId
      )
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const exists = previousWishlist.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return previousWishlist.filter(
          (item) => item._id !== product._id
        );
      }

      return [
        ...previousWishlist,
        product,
      ];
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}