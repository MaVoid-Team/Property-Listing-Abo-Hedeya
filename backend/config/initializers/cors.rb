# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow specific origins - credentials require explicit origins (not wildcard)
    # In development, allow localhost. In production, use FRONTEND_URL or CORS_ORIGINS
    allowed_origins = if ENV['FRONTEND_URL'].present?
      [ENV['FRONTEND_URL']]
    elsif ENV['CORS_ORIGINS'].present?
      ENV['CORS_ORIGINS'].split(',').map(&:strip)
    else
      # Development defaults - allow common local development URLs
      [
        'http://localhost:3001',
        'http://localhost:3000',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:3000',
        %r{\Ahttps?://.*\.vercel\.app\z},
        %r{\Ahttps?://.*\.railway\.app\z}
      ]
    end

    origins(*allowed_origins)

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ["Authorization"],
      credentials: true
  end
end
