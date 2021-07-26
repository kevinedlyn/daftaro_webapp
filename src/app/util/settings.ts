export class Setting {
    static mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    static passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z\d]).{7,}$/m;
    
    static cookieExpire = 7;
    static ImageUploadSize = 5 * 1024 * 1024;
    
    static REFERSH_TOKEN_KEY = "refresh_token";
    static ACCESS_TOKEN_KEY = "access_token";
    static PROFILE_KEY = "profile";
    static RESET_PASSWORD_KEY = "reset_token";
    
    static OLD_PASSWORD_SECRET_KEY = "ADMIN-W1THOUTP@5SWoRDPR1V1LegE!";
}
