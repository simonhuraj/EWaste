package sk.ewaste.server.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sk.ewaste.server.entities.Manager;
import sk.ewaste.server.services.ManagerService;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final ManagerService managerService;

    public CustomUserDetailService(ManagerService managerService) {
        this.managerService = managerService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Manager managerFromDB = managerService.getManagerByUsername(username);
        return new CustomUserDetails(managerFromDB);
    }
}
