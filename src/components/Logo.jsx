import logoImg from '../assets/shomrat-logo.jpg';

const Logo = ({ className = "", size = "normal", variant = "white" }) => {
    // Sizes: small, normal, large - controlling width
    const sizeClasses = {
        small: "w-24",
        normal: "w-48",
        large: "w-80"
    };

    return (
        <div className={`flex flex-col items-center justify-center select-none ${className}`}>
            <img
                src={logoImg}
                alt="שמרת הזורע - סיפור אהבה ישראלי"
                className={`${sizeClasses[size] || "w-48"} object-contain`}
            />
        </div>
    );
};

export default Logo;
