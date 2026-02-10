"use client";

import { Package, Plus } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import AddToPantryModal from "@/components/AddToPantryModal";

const PantryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState({ name: "", quantity: "" });

  const handleModalSuccess = () => {};

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Package className="w-16 h-16 text-green-600" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
                  My Pantry
                </h1>
                <p className="text-stone-600 font-light">
                  Manage your ingredients and pantry items
                </p>
              </div>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:flex"
              size="lg"
              variant="primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add to Pantry
            </Button>
          </div>
        </div>
        {/*Quick Action cards*/}
        {/*Loading State*/}
        {/*Empty State*/}
      </div>

      {/*Add to Pantry Modal*/}
      <AddToPantryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default PantryPage;
