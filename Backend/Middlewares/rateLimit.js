import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs : 15*60*1000,
    max:20,
    message : "You’ve hit the limit. Please wait a few minutes before trying again." 
});

export default rateLimiter;