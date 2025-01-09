import { Star, StarOff } from "lucide-react";

// Define an interface for the props
interface ContactProps {
    image?: string; 
    firstName: string; 
    lastName: string;
    email: string;
    phone: string;
    address: string;
    isFavorite: boolean;
    onFavoriteToggle: () => void; // function w/o parameters
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
        <div className="flex items-center p-4 rounded-full bg-blue-600 text-white shadow-md space-x-4">
            <div className="flex-shrink-0">
                {image ? (
                    <img
                        src={image}
                        alt={`${firstName} ${lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg">
                        ?
                    </div>
                )}
            </div>

            <div className="flex-1">
                <div className="text-lg font-semibold">
                    {firstName} {lastName}
                </div>
                <div className="text-sm mt-1 space-y-1">
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{address}</p>
                </div>
            </div>

            <button 
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
                onClick={onFavoriteToggle}
                aria-label="Toggle Favorite"
            >
                {isFavorite 
                    ? (<Star className="w-5 h-5 text-yellow-400" />) 
                    : (<StarOff className="w-5 h-5" />)}
            </button>
        </div>
    )
}

export default Contact