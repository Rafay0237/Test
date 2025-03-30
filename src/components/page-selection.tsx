import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import CheckboxButton from "./ui/checkbox-btn";
import Divider from "./ui/divider";
import { pages } from "@/constants/pages";

export default function PageSelectionDialog() {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const allSelected = selectedPages.length === pages.length;

  const togglePage = (pageId: number) => {
    setSelectedPages((prev) =>
      prev.includes(pageId) ? prev.filter((id) => id !== pageId) : [...prev, pageId]
    );
  };

  const toggleAllPages = () => {
    setSelectedPages(allSelected ? [] : pages.map((page) => page.id));
  };

  const handleDone = () => {
    if (!selectedPages.length) {
      toast.error("No pages selected");
      return;
    }

    const selectedPageNames = pages
      .filter((page) => selectedPages.includes(page.id))
      .map((page) => page.name)
      .join(", ");

    toast.success(`Selected pages: ${selectedPageNames}`);
    setSelectedPages([]);
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md border border-[#EEEEEE] overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-sm font-normal text-black">All pages</h2>
        <CheckboxButton isChecked={allSelected} onClick={toggleAllPages} />
      </div>
      
      <Divider />

      <div>
        {pages.map((page) => (
          <div key={page.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-black font-normal">{page.name}</span>
            <CheckboxButton
              isChecked={selectedPages.includes(page.id)}
              onClick={() => togglePage(page.id)}
            />
          </div>
        ))}
      </div>

      <Divider />

      <div className="p-4">
        <Button variant="orange" className="w-full" onClick={handleDone}>
          Done
        </Button>
      </div>
    </div>
  );
}

