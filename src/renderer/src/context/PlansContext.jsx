import React, { createContext, useContext, useState } from 'react';

const PlansContext = createContext();

export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState([
    {
      id: 'plan_1',
      name: 'ELITE TIER',
      duration: '1 Month',
      price: 2500,
      finalPrice: 2500,
      workoutType: 'cardio_weights',
      hasOffer: false,
      offer: null,
      memberCount: 65,
      features: [
        'Full Gym Access',
        'Cardio + Weight Training',
        'All Equipment Access',
        'Fitness Assessment',
        'Personal Locker',
      ],
      template: {
        id: 'cardio_weights',
        name: 'ELITE TIER',
        badge: 'ELITE',
        iconColor: '#C5A059',
        textColor: '#C5A059',
      },
    },
    {
      id: 'plan_2',
      name: 'LEGENDARY TIER',
      duration: '3 Months',
      price: 6000,
      finalPrice: 5400,
      workoutType: 'weights_only',
      hasOffer: true,
      offer: {
        type: 'percentage',
        value: 10,
        text: '10% OFF',
      },
      memberCount: 43,
      features: [
        'Weight Zone Access',
        'Free Weights & Machines',
        'Strength Programs',
        'Progress Tracking',
        'Personal Trainer Support',
      ],
      template: {
        id: 'weights_only',
        name: 'LEGENDARY TIER',
        badge: 'LEGENDARY',
        iconColor: '#a855f7',
        textColor: '#c084fc',
      },
    },
  ]);

  const deployPlan = async (planData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPlan = {
          ...planData,
          id: `plan_${Date.now()}`,
          memberCount: 0,
        };
        setPlans((prev) => [...prev, newPlan]);
        resolve(newPlan);
      }, 800);
    });
  };

  const deletePlan = async (planId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPlans((prev) => prev.filter((p) => p.id !== planId));
        resolve();
      }, 500);
    });
  };

  const updatePlan = async (planId, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPlans((prev) =>
          prev.map((p) => (p.id === planId ? { ...p, ...updatedData } : p))
        );
        resolve();
      }, 500);
    });
  };

  return (
    <PlansContext.Provider value={{ plans, deployPlan, deletePlan, updatePlan }}>
      {children}
    </PlansContext.Provider>
  );
};

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (!context) throw new Error('usePlans must be used within PlansProvider');
  return context;
};