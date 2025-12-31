import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, DollarSign, TrendingUp, Wrench, Users } from 'lucide-react';

interface Property {
  id: string;
  type: 'Residential' | 'Commercial' | 'Industrial';
  name: string;
  price: number;
  rent: number;
  maintenance: number;
  condition: number;
  tenants: number;
  maxTenants: number;
  appreciation: number;
  image: string;
}

interface OwnedProperty extends Property {
  purchasePrice: number;
  purchaseDate: Date;
  lastMaintenance: Date;
  improvements: string[];
}

const RealEstateEmpire: React.FC = () => {
  const [balance, setBalance] = useState(100000);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      type: 'Residential',
      name: 'Cozy Apartment',
      price: 120000,
      rent: 1200,
      maintenance: 200,
      condition: 85,
      tenants: 0,
      maxTenants: 2,
      appreciation: 0.03,
      image: 'apartment.jpg'
    },
    {
      id: '2',
      type: 'Commercial',
      name: 'Downtown Office',
      price: 250000,
      rent: 3500,
      maintenance: 500,
      condition: 90,
      tenants: 0,
      maxTenants: 4,
      appreciation: 0.04,
      image: 'office.jpg'
    },
    {
      id: '3',
      type: 'Industrial',
      name: 'Warehouse Space',
      price: 180000,
      rent: 2200,
      maintenance: 300,
      condition: 75,
      tenants: 0,
      maxTenants: 1,
      appreciation: 0.025,
      image: 'warehouse.jpg'
    }
  ]);
  const [portfolio, setPortfolio] = useState<OwnedProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [gameTime, setGameTime] = useState<Date>(new Date());
  const [marketTrends] = useState([
    'Property values rising in downtown area',
    'New business district development announced',
    'Interest rates expected to remain stable',
    'Housing demand increases in suburban areas'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Advance game time by 1 month
      setGameTime(prev => {
        const next = new Date(prev);
        next.setMonth(next.getMonth() + 1);
        return next;
      });

      // Collect rent and handle maintenance
      let income = 0;
      setPortfolio(prev => prev.map(property => {
        const monthlyRent = property.rent * property.tenants;
        income += monthlyRent - property.maintenance;

        // Random events and property condition changes
        const conditionChange = Math.random() * 5;
        let newCondition = property.condition - conditionChange;
        if (newCondition < 50) {
          // Emergency repairs needed
          newCondition = 75;
          income -= property.maintenance * 2;
        }

        // Property appreciation
        const appreciatedPrice = property.price * (1 + property.appreciation / 12);

        return {
          ...property,
          condition: newCondition,
          price: appreciatedPrice
        };
      }));

      setMonthlyIncome(income);
      setBalance(prev => prev + income);

      // Update market properties
      setProperties(prev => prev.map(property => ({
        ...property,
        price: property.price * (1 + (Math.random() * 0.02 - 0.01))
      })));
    }, 5000); // 5 seconds = 1 game month

    return () => clearInterval(interval);
  }, []);

  const handlePurchase = (property: Property) => {
    if (balance < property.price) {
      alert('Insufficient funds!');
      return;
    }

    const ownedProperty: OwnedProperty = {
      ...property,
      purchasePrice: property.price,
      purchaseDate: new Date(gameTime),
      lastMaintenance: new Date(gameTime),
      improvements: []
    };

    setPortfolio(prev => [...prev, ownedProperty]);
    setBalance(prev => prev - property.price);
    setSelectedProperty(null);
  };

  const handleSell = (property: OwnedProperty) => {
    setPortfolio(prev => prev.filter(p => p.id !== property.id));
    setBalance(prev => prev + property.price);
  };

  const handleMaintenance = (property: OwnedProperty) => {
    if (balance < property.maintenance * 3) {
      alert('Insufficient funds for maintenance!');
      return;
    }

    setPortfolio(prev => prev.map(p => {
      if (p.id === property.id) {
        return {
          ...p,
          condition: Math.min(100, p.condition + 20),
          lastMaintenance: new Date(gameTime)
        };
      }
      return p;
    }));

    setBalance(prev => prev - property.maintenance * 3);
  };

  const handleFindTenants = (property: OwnedProperty) => {
    if (property.tenants >= property.maxTenants) {
      alert('Property is fully occupied!');
      return;
    }

    const marketingCost = property.rent;
    if (balance < marketingCost) {
      alert('Insufficient funds for marketing!');
      return;
    }

    setPortfolio(prev => prev.map(p => {
      if (p.id === property.id) {
        return {
          ...p,
          tenants: Math.min(p.maxTenants, p.tenants + 1)
        };
      }
      return p;
    }));

    setBalance(prev => prev - marketingCost);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Portfolio Overview */}
      <div className="col-span-12 lg:col-span-8 space-y-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">Real Estate Empire</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Available Cash</div>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Monthly Income</div>
              <div className="text-2xl font-bold">${monthlyIncome.toFixed(2)}</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600">Properties Owned</div>
              <div className="text-2xl font-bold">{portfolio.length}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {properties.map(property => (
              <motion.div
                key={property.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors
                  ${selectedProperty?.id === property.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                  }`}
                onClick={() => setSelectedProperty(property)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{property.name}</h3>
                    <div className="text-sm text-gray-600">{property.type}</div>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    ${property.rent}/mo
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold">${property.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Maintenance:</span>
                    <span className="font-semibold">${property.maintenance}/mo</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Condition:</span>
                    <span className="font-semibold">{property.condition}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Max Tenants:</span>
                    <span className="font-semibold">{property.maxTenants}</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(property)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Purchase Property
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio & Market Trends */}
      <div className="col-span-12 lg:col-span-4 space-y-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">Your Properties</h2>
          <div className="space-y-4">
            {portfolio.map(property => (
              <div key={property.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{property.name}</h3>
                    <div className="text-sm text-gray-600">{property.type}</div>
                  </div>
                  <div className="text-sm text-green-600">
                    +${(property.rent * property.tenants).toFixed(2)}/mo
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Condition:</span>
                    <span className={`font-semibold ${
                      property.condition < 60 ? 'text-red-600' :
                      property.condition < 80 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {property.condition.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tenants:</span>
                    <span className="font-semibold">
                      {property.tenants}/{property.maxTenants}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Value:</span>
                    <span className="font-semibold">
                      ${property.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleMaintenance(property)}
                    className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Wrench className="w-4 h-4 mr-1" />
                    Maintain
                  </button>
                  <button
                    onClick={() => handleFindTenants(property)}
                    className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Find Tenants
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">Market Trends</h2>
          <div className="space-y-2">
            {marketTrends.map((trend, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="w-4 h-4 inline-block mr-2 text-blue-600" />
                {trend}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateEmpire;
