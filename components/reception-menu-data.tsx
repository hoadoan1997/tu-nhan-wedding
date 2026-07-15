import type { ModalItem } from "@/components/event-detail-modal"

/**
 * Reception dinner menu — shared by the Order-of-Events timeline popup and the
 * "View Menu" button on the seating result card so the courses stay in sync.
 */
export const DINNER_MENU: { heading: string; numbered: boolean; items: ModalItem[] } = {
  heading: "Dinner Menu",
  numbered: true,
  items: [
    { text: "Crab Meat Seafood Fish Maw Soup" },
    { text: "Canton House Appetizer" },
    { text: "Golden Shrimp Crab Claw" },
    { text: "Whole Braised Abalone" },
    { text: "X.O. Seafood & Seafood Roll" },
    { text: "Pan Fried Halibut" },
    { text: "Black Pepper Lamb Chops" },
    { text: "Seafood Fried Rice" },
    { text: "Pandan Crème Brûlée" },
    { text: "Wedding Cake" },
  ],
}
