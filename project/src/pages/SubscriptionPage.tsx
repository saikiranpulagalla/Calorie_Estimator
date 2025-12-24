import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
	{
		key: 'free',
		title: 'Free Version',
		price: '₹0',
		features: [
			'Limited food image submissions (10 per day)',
			'Limited chatbot talk time (30 min/day)',
			'Basic nutrition analysis',
			'Access to dashboard & meal log',
		],
	},
	{
		key: 'paid',
		title: 'Pro Version',
		price: '₹499/month',
		features: [
			'Unlimited food image submissions',
			'Unlimited chatbot talk time',
			'Advanced nutrition analysis',
			'Priority support',
			'Early access to new features',
		],
	},
];

const SubscriptionPage: React.FC = () => {
	const [selectedPlan, setSelectedPlan] = useState<'free' | 'paid'>('free');
	const navigate = useNavigate();

	return (
		<div className="pt-16 min-h-screen bg-nutrify-light dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
			<div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-gray-900 dark:text-gray-100">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
					Choose Your Plan
				</h1>
				<p className="text-gray-600 mb-8 text-center">
					Select the plan that best fits your needs. Upgrade anytime!
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{plans.map(plan => (
						<div
							key={plan.key}
							onClick={() => setSelectedPlan(plan.key as 'free' | 'paid')}
							className={`rounded-xl border-2 p-6 text-left transition-all cursor-pointer ${
								selectedPlan === plan.key
									? 'border-nutrify-accent bg-nutrify-light shadow-lg'
									: 'border-gray-200 bg-white hover:border-nutrify-accent'
							}`}
						>
							<div className="flex items-center justify-between mb-2">
								<span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
									{plan.title}
								</span>
								{selectedPlan === plan.key && (
									<span className="text-xs bg-nutrify-accent text-white px-2 py-1 rounded-full ml-2">
										Selected
									</span>
								)}
							</div>
							<div className="text-2xl font-bold text-nutrify-accent mb-4">
								{plan.price}
							</div>
							<ul className="mb-4 space-y-2">
								{plan.features.map((feature, idx) => (
									<li key={idx} className="flex items-center text-gray-700">
										<span className="mr-2 text-nutrify-accent">✓</span>
										{feature}
									</li>
								))}
							</ul>
							{plan.key === 'paid' && (
								<button
									className={`w-full nutrify-btn-primary mt-2 ${
										selectedPlan === 'paid' ? '' : 'opacity-50 pointer-events-none'
									}`}
									disabled={selectedPlan !== 'paid'}
									onClick={() => navigate('/payment')}
									type="button"
								>
									Subscribe Now
								</button>
							)}
							{plan.key === 'free' && (
								<button
									className={`w-full nutrify-btn-outline mt-2 ${
										selectedPlan === 'free' ? '' : 'opacity-50 pointer-events-none'
									}`}
									disabled={selectedPlan !== 'free'}
									onClick={() => alert('You are already on the free plan!')}
									type="button"
								>
									Continue Free
								</button>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SubscriptionPage;