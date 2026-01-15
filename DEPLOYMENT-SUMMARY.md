# Docker Compose Deployment - Quick Start Guide

## 📋 Summary

Your Property Listing application is now ready for Docker deployment with:
- **Backend**: Rails 8 API with PostgreSQL database
- **Frontend**: Next.js application with internationalization
- **Nginx**: Reverse proxy configuration (on host)
- **Docker Compose**: Orchestrates all services

## 🏗️ What Was Created

### 1. Docker Configuration Files

- **`docker-compose.yml`** - Orchestrates all services (backend, frontend, PostgreSQL)
- **`frontend/Dockerfile`** - Multi-stage Next.js production build
- **`backend/Dockerfile`** - Updated for Docker Compose (port 3000)
- **`.env.example`** - Environment variables template
- **`.dockerignore`** - Excludes unnecessary files from builds

### 2. Nginx Configuration

- **`nginx-config-example.conf`** - Complete nginx reverse proxy setup
  - SSL/TLS configuration
  - Separate domains for frontend and API
  - Compression and caching
  - Security headers

### 3. Documentation & Scripts

- **`README.Docker.md`** - Complete deployment guide
- **`deploy.sh`** - Interactive deployment script
- **`.dockerignore`** files - Optimize build contexts

## 🚀 Quick Deployment Steps

### On Your VPS:

1. **Clone the repository**
   ```bash
   cd /opt
   git clone <your-repo> property-listing
   cd property-listing
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   nano .env
   ```

3. **Get required secrets**
   ```bash
   # Rails master key (from your local machine)
   cat backend/config/master.key
   
   # Generate JWT secret
   docker run --rm -it ruby:3.2.6-slim bash -c "gem install rails && rails secret"
   ```

4. **Deploy with the script**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

5. **Configure Nginx**
   ```bash
   sudo cp nginx-config-example.conf /etc/nginx/sites-available/property-listing
   sudo nano /etc/nginx/sites-available/property-listing  # Edit domains
   sudo ln -s /etc/nginx/sites-available/property-listing /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

6. **Setup SSL (optional but recommended)**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## 🔧 Architecture

```
┌─────────────────────────────────────────────┐
│              Internet                        │
└───────────────┬─────────────────────────────┘
                │
        ┌───────▼────────┐
        │  Nginx (Host)  │
        │  Port 80/443   │
        │  yourdomain.com│
        └───────┬────────┘
                │
        ┌───────┴────────┐
        │                │
        │  /  →    /api →│
        │                │
┌───────▼─────┐  ┌──────▼──────┐
│  Frontend   │  │  Backend    │
│  Container  │  │  Container  │
│  Port 3001  │  │  Port 3000  │
└─────────────┘  └──────┬──────┘
                        │
                 ┌──────▼──────┐
                 │  PostgreSQL │
                 │  Container  │
                 │  Port 5432  │
                 └─────────────┘
```

## 🔑 Key Configuration Points

### Backend Configuration
- **Port**: 3000 (exposed to host as 127.0.0.1:3000)
- **Database**: PostgreSQL in separate container
- **Environment**: Production mode with Rails 8
- **Storage**: Persistent volume for file uploads
- **Health check**: `/up` endpoint

### Frontend Configuration
- **Port**: 3001 (exposed to host as 127.0.0.1:3001)
- **Build**: Standalone output for Docker
- **API URL**: Configured via NEXT_PUBLIC_API_URL
- **Internationalization**: English and Arabic support

### Database Configuration
- **Image**: PostgreSQL 16 Alpine
- **Port**: 5432 (only accessible from containers)
- **Data**: Persistent volume
- **Backups**: Stored in `./backup/` directory

### Nginx Configuration
- **Frontend**: yourdomain.com/ → http://127.0.0.1:3001
- **Backend API**: yourdomain.com/api → http://127.0.0.1:3000
- **SSL**: Let's Encrypt certificates
- **Compression**: Gzip enabled
- **Caching**: Static assets cached

## 📝 Important Notes

### Security
1. ✅ Containers only expose ports to localhost (127.0.0.1)
2. ✅ Nginx handles SSL/TLS termination
3. ✅ Database not exposed to public internet
4. ✅ Non-root users inside containers
5. ⚠️ Never commit `.env` file to version control
6. ⚠️ Use strong passwords for database

### Nginx Integration
- Nginx runs on HOST (not in Docker)
- Containers bind to 127.0.0.1 (localhost only)
- Nginx proxies requests to containers
- This allows nginx to manage multiple apps

### Backend Changes Made
- Changed exposed port from 80 to 3000
- Already had proper multi-stage build
- Already had database initialization
- Already had health checks

### Frontend Changes Made
- Created production Dockerfile
- Enabled standalone output in next.config.mjs
- Configured for container deployment
- Set port to 3001

## 🛠️ Common Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend

# Check status
docker-compose ps

# Restart a service
docker-compose restart backend

# Stop services
docker-compose down

# Update application
git pull
docker-compose build
docker-compose up -d

# Database backup
docker-compose exec postgres pg_dump -U property_user property_listing_production > backup.sql

# Access Rails console
docker-compose exec backend bin/rails console

# Run migrations
docker-compose exec backend bin/rails db:migrate
```

## 🔍 Troubleshooting

### Backend can't connect to database
```bash
docker-compose logs postgres
docker-compose logs backend
docker-compose exec backend env | grep DATABASE
```

### Frontend can't reach backend
```bash
curl http://localhost:3000/up
docker-compose exec frontend ping backend
docker-compose exec frontend env | grep API_URL
```

### Nginx issues
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/*error.log
```

### Reset everything
```bash
docker-compose down -v
docker-compose up -d --build
```

## 📚 Additional Resources

- **Full Documentation**: See `README.Docker.md`
- **Nginx Config**: See `nginx-config-example.conf`
- **Environment Setup**: See `.env.example`
- **Deployment Script**: Run `./deploy.sh`

## ✅ Checklist Before Going Live

- [ ] Environment variables configured in `.env`
- [ ] RAILS_MASTER_KEY set correctly
- [ ] Database password is strong
- [ ] Domain DNS records pointing to VPS
- [ ] SSL certificates installed
- [ ] Nginx configuration updated with real domains
- [ ] Firewall configured (ports 80, 443, 22)
- [ ] Database backup strategy in place
- [ ] Logs rotation configured
- [ ] Monitoring setup (optional)

## 🎯 Next Steps

1. Test locally first if possible
2. Deploy to VPS following the guide
3. Configure domain names
4. Setup SSL with Let's Encrypt
5. Test all functionality
6. Setup automated backups
7. Monitor logs and performance

---

**Need Help?** Refer to `README.Docker.md` for detailed instructions.
