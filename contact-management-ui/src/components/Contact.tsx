import { Heart, HeartOff } from "lucide-react";

interface ContactProps {
    image?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
}

const Contact = ({
    image,
    firstName,
    lastName,
    email,
    phone,
    address,
    isFavorite,
    onFavoriteToggle,
}: ContactProps) => {
    return (
        <div className="relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            {/* Heart Icon */}
            <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={onFavoriteToggle}
                aria-label="Toggle Favorite"
            >
                {isFavorite ? (
                    <Heart className="w-5 h-5 text-red-500" />
                ) : (
                    <HeartOff className="w-5 h-5 text-gray-400" />
                )}
            </button>

            {/* Contact Image */}
            <div className="flex justify-center mb-4">
                {image ? (
                    <img
                        src={image}
                        alt={`${firstName} ${lastName}`}
                        className="w-20 h-20 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-lg">
                        ?
                    </div>
                )}
            </div>

            {/* Contact Details */}
            <div className="text-center">
                <div className="text-xl font-semibold">
                    {firstName} {lastName}
                </div>
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{address}</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;