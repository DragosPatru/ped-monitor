package com.simplypositive.pedmonitor;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class WebFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String path = request.getRequestURI();
    if (!path.startsWith("/api")
        && !path.startsWith("/h2-console")
        && !path.contains(".")
        && path.matches("/(.*)")) {
      request.getRequestDispatcher("/").forward(request, response);
      return;
    }

    filterChain.doFilter(request, response);
  }
}
