import {
    // Lucide React Icons
    Atom,
    AudioLines,
    Bot,
    Braces,
    Brain,
    ClipboardCheck,
    Cloud,
    Container,
    Cpu,
    Database,
    Gamepad,
    Gauge,
    GitBranch,
    Layers,
    Layout,
    Link,
    MessageSquare,
    Monitor,
    Radio,
    Search,
    Server,
    Shield,
    Smartphone,
    Terminal,
    Webhook,
    Mail,
    Send,
    Share2,
    Globe,
    MapPin,
} from 'lucide-react';
import { BsMicrosoftTeams } from 'react-icons/bs';

// React Icons
import {
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaWhatsapp,
    FaPhone,
    FaNodeJs,
    FaReact,
    FaPython,
    FaJava,
    FaDocker,
    FaGitlab,
    FaBitbucket,
    FaJenkins,
    FaUnity,
} from 'react-icons/fa';

import {
    SiTypescript,
    SiJavascript,
    SiMongodb,
    SiPostgresql,
    SiRedis,
    SiNextdotjs,
    SiVuedotjs,
    SiAngular,
    SiSvelte,
    SiTensorflow,
    SiPytorch,
    SiKubernetes,
    SiNginx,
    SiApache,
    SiDotnet,
    SiPhp,
    SiRuby,
    SiGo,
    SiRust,
    SiFirebase,
    SiAuth0,
    SiGraphql,
    SiGrafana,
    SiPrometheus,
    SiGithubactions,
    SiFlutter,
    SiIonic,
    SiDiscord,
    SiTelegram,
    SiSlack,
    SiGitlab,
} from 'react-icons/si';


export const IconComponent = ({ icon }: { icon: string }) => {
    const iconKey = icon.toLowerCase().trim();

    // Tech Icons Map (Lucide React)
    const techIcons: Record<string, React.ReactNode> = {
        // Databases
        'database': <Database className="text-primary-container mb-4" size={36} />,
        'postgresql': <SiPostgresql className="text-primary-container mb-4" size={36} />,
        'mysql': <Database className="text-primary-container mb-4" size={36} />,
        'mongodb': <SiMongodb className="text-primary-container mb-4" size={36} />,
        'redis': <SiRedis className="text-primary-container mb-4" size={36} />,
        'elasticsearch': <Database className="text-primary-container mb-4" size={36} />,
        'dynamodb': <Database className="text-primary-container mb-4" size={36} />,
        'firestore': <Database className="text-primary-container mb-4" size={36} />,
        'sqlite': <Database className="text-primary-container mb-4" size={36} />,

        // Servers & Infrastructure
        'server': <Server className="text-primary-container mb-4" size={36} />,
        'nginx': <SiNginx className="text-primary-container mb-4" size={36} />,
        'apache': <SiApache className="text-primary-container mb-4" size={36} />,
        'node': <FaNodeJs className="text-primary-container mb-4" size={36} />,
        'nodejs': <FaNodeJs className="text-primary-container mb-4" size={36} />,
        'python': <FaPython className="text-primary-container mb-4" size={36} />,
        'java': <FaJava className="text-primary-container mb-4" size={36} />,
        'dotnet': <SiDotnet className="text-primary-container mb-4" size={36} />,
        'php': <SiPhp className="text-primary-container mb-4" size={36} />,
        'ruby': <SiRuby className="text-primary-container mb-4" size={36} />,
        'go': <SiGo className="text-primary-container mb-4" size={36} />,
        'rust': <SiRust className="text-primary-container mb-4" size={36} />,
        'typescript': <SiTypescript className="text-primary-container mb-4" size={36} />,
        'javascript': <SiJavascript className="text-primary-container mb-4" size={36} />,

        // Cloud
        'cloud': <Cloud className="text-primary-container mb-4" size={36} />,
        'aws': <Cloud className="text-primary-container mb-4" size={36} />,
        'azure': <Cloud className="text-primary-container mb-4" size={36} />,
        'gcp': <Cloud className="text-primary-container mb-4" size={36} />,
        'cloudflare': <Cloud className="text-primary-container mb-4" size={36} />,
        'digitalocean': <Cloud className="text-primary-container mb-4" size={36} />,
        'heroku': <Cloud className="text-primary-container mb-4" size={36} />,
        'vercel': <Cloud className="text-primary-container mb-4" size={36} />,
        'netlify': <Cloud className="text-primary-container mb-4" size={36} />,

        // Security
        'shield': <Shield className="text-primary-container mb-4" size={36} />,
        'security': <Shield className="text-primary-container mb-4" size={36} />,
        'ssl': <Shield className="text-primary-container mb-4" size={36} />,
        'jwt': <Shield className="text-primary-container mb-4" size={36} />,
        'oauth': <Shield className="text-primary-container mb-4" size={36} />,
        'firebase': <SiFirebase className="text-primary-container mb-4" size={36} />,
        'auth0': <SiAuth0 className="text-primary-container mb-4" size={36} />,

        // CPU/Processing
        'cpu': <Cpu className="text-primary-container mb-4" size={36} />,
        'microservices': <Cpu className="text-primary-container mb-4" size={36} />,
        'distributed': <Cpu className="text-primary-container mb-4" size={36} />,
        'parallel': <Cpu className="text-primary-container mb-4" size={36} />,
        'concurrent': <Cpu className="text-primary-container mb-4" size={36} />,
        'async': <Cpu className="text-primary-container mb-4" size={36} />,

        // Layers/Architecture
        'layers': <Layers className="text-primary-container mb-4" size={36} />,
        'architecture': <Layers className="text-primary-container mb-4" size={36} />,
        'stack': <Layers className="text-primary-container mb-4" size={36} />,
        'fullstack': <Layers className="text-primary-container mb-4" size={36} />,
        'microfrontend': <Layers className="text-primary-container mb-4" size={36} />,
        'modular': <Layers className="text-primary-container mb-4" size={36} />,
        'components': <Layers className="text-primary-container mb-4" size={36} />,

        // Containers
        'container': <Container className="text-primary-container mb-4" size={36} />,
        'docker': <FaDocker className="text-primary-container mb-4" size={36} />,
        'kubernetes': <SiKubernetes className="text-primary-container mb-4" size={36} />,
        'k8s': <SiKubernetes className="text-primary-container mb-4" size={36} />,
        'openshift': <Container className="text-primary-container mb-4" size={36} />,

        // Frameworks
        'atom': <Atom className="text-primary-container mb-4" size={36} />,
        'react': <FaReact className="text-primary-container mb-4" size={36} />,
        'nextjs': <SiNextdotjs className="text-primary-container mb-4" size={36} />,
        'next': <SiNextdotjs className="text-primary-container mb-4" size={36} />,
        'vue': <SiVuedotjs className="text-primary-container mb-4" size={36} />,
        'angular': <SiAngular className="text-primary-container mb-4" size={36} />,
        'svelte': <SiSvelte className="text-primary-container mb-4" size={36} />,

        // AI/ML
        'ai': <Atom className="text-primary-container mb-4" size={36} />,
        'ml': <Atom className="text-primary-container mb-4" size={36} />,
        'tensorflow': <SiTensorflow className="text-primary-container mb-4" size={36} />,
        'pytorch': <SiPytorch className="text-primary-container mb-4" size={36} />,
        'brain': <Brain className="text-primary-container mb-4" size={36} />,

        // IoT
        'radio': <Radio className="text-primary-container mb-4" size={36} />,
        'iot': <Radio className="text-primary-container mb-4" size={36} />,
        'mqtt': <Radio className="text-primary-container mb-4" size={36} />,
        'ble': <Radio className="text-primary-container mb-4" size={36} />,
        'zigbee': <Radio className="text-primary-container mb-4" size={36} />,

        // Code
        'braces': <Braces className="text-primary-container mb-4" size={36} />,
        'code': <Braces className="text-primary-container mb-4" size={36} />,
        'programming': <Braces className="text-primary-container mb-4" size={36} />,
        'development': <Braces className="text-primary-container mb-4" size={36} />,
        'software': <Braces className="text-primary-container mb-4" size={36} />,
        'engineering': <Braces className="text-primary-container mb-4" size={36} />,
        'algorithm': <Braces className="text-primary-container mb-4" size={36} />,
        'datastructures': <Braces className="text-primary-container mb-4" size={36} />,

        // Audio
        'audiolines': <AudioLines className="text-primary-container mb-4" size={36} />,
        'audio': <AudioLines className="text-primary-container mb-4" size={36} />,
        'music': <AudioLines className="text-primary-container mb-4" size={36} />,
        'voice': <AudioLines className="text-primary-container mb-4" size={36} />,
        'sound': <AudioLines className="text-primary-container mb-4" size={36} />,
        'podcast': <AudioLines className="text-primary-container mb-4" size={36} />,

        // Search
        'search': <Search className="text-primary-container mb-4" size={36} />,
        'optimization': <Search className="text-primary-container mb-4" size={36} />,
        'analytics': <Search className="text-primary-container mb-4" size={36} />,
        'seo': <Search className="text-primary-container mb-4" size={36} />,
        'data': <Search className="text-primary-container mb-4" size={36} />,
        'bigdata': <Search className="text-primary-container mb-4" size={36} />,

        // Mobile
        'smartphone': <Smartphone className="text-primary-container mb-4" size={36} />,
        'mobile': <Smartphone className="text-primary-container mb-4" size={36} />,
        'android': <Smartphone className="text-primary-container mb-4" size={36} />,
        'ios': <Smartphone className="text-primary-container mb-4" size={36} />,
        'reactnative': <Smartphone className="text-primary-container mb-4" size={36} />,
        'flutter': <SiFlutter className="text-primary-container mb-4" size={36} />,
        'ionic': <SiIonic className="text-primary-container mb-4" size={36} />,

        // Bot
        'bot': <Bot className="text-primary-container mb-4" size={36} />,
        'chatbot': <Bot className="text-primary-container mb-4" size={36} />,
        'automation': <Bot className="text-primary-container mb-4" size={36} />,
        'rpa': <Bot className="text-primary-container mb-4" size={36} />,
        'discord': <SiDiscord className="text-primary-container mb-4" size={36} />,
        'telegram': <SiTelegram className="text-primary-container mb-4" size={36} />,

        // Git & Version Control
        'github': <FaGithub className="text-primary-container mb-4" size={36} />,
        'git': <GitBranch className="text-primary-container mb-4" size={36} />,
        'gitlab': <FaGitlab className="text-primary-container mb-4" size={36} />,
        'bitbucket': <FaBitbucket className="text-primary-container mb-4" size={36} />,
        'versioncontrol': <GitBranch className="text-primary-container mb-4" size={36} />,
        'vcs': <GitBranch className="text-primary-container mb-4" size={36} />,

        // Web/API
        'webhook': <Webhook className="text-primary-container mb-4" size={36} />,
        'api': <Webhook className="text-primary-container mb-4" size={36} />,
        'rest': <Webhook className="text-primary-container mb-4" size={36} />,
        'graphql': <SiGraphql className="text-primary-container mb-4" size={36} />,
        'websocket': <Webhook className="text-primary-container mb-4" size={36} />,
        'grpc': <Webhook className="text-primary-container mb-4" size={36} />,

        // Performance
        'gauge': <Gauge className="text-primary-container mb-4" size={36} />,
        'performance': <Gauge className="text-primary-container mb-4" size={36} />,
        'optimize': <Gauge className="text-primary-container mb-4" size={36} />,
        'speed': <Gauge className="text-primary-container mb-4" size={36} />,
        'loadbalancing': <Gauge className="text-primary-container mb-4" size={36} />,
        'caching': <Gauge className="text-primary-container mb-4" size={36} />,

        // UI/UX
        'layout': <Layout className="text-primary-container mb-4" size={36} />,
        'design': <Layout className="text-primary-container mb-4" size={36} />,
        'ui': <Layout className="text-primary-container mb-4" size={36} />,
        'ux': <Layout className="text-primary-container mb-4" size={36} />,
        'wireframe': <Layout className="text-primary-container mb-4" size={36} />,
        'prototype': <Layout className="text-primary-container mb-4" size={36} />,
        'responsive': <Layout className="text-primary-container mb-4" size={36} />,

        // DevOps
        'devops': <GitBranch className="text-primary-container mb-4" size={36} />,
        'ci': <GitBranch className="text-primary-container mb-4" size={36} />,
        'cd': <GitBranch className="text-primary-container mb-4" size={36} />,
        'pipeline': <GitBranch className="text-primary-container mb-4" size={36} />,
        'jenkins': <FaJenkins className="text-primary-container mb-4" size={36} />,
        'githubactions': <SiGithubactions className="text-primary-container mb-4" size={36} />,
        'gitlabci': <SiGitlab className="text-primary-container mb-4" size={36} />,

        // Testing
        'test': <ClipboardCheck className="text-primary-container mb-4" size={36} />,
        'testing': <ClipboardCheck className="text-primary-container mb-4" size={36} />,
        'qa': <ClipboardCheck className="text-primary-container mb-4" size={36} />,
        'unit': <ClipboardCheck className="text-primary-container mb-4" size={36} />,
        'integration': <ClipboardCheck className="text-primary-container mb-4" size={36} />,
        'e2e': <ClipboardCheck className="text-primary-container mb-4" size={36} />,

        // Monitoring
        'monitor': <Monitor className="text-primary-container mb-4" size={36} />,
        'logging': <Monitor className="text-primary-container mb-4" size={36} />,
        'metrics': <Monitor className="text-primary-container mb-4" size={36} />,
        'alerting': <Monitor className="text-primary-container mb-4" size={36} />,
        'grafana': <SiGrafana className="text-primary-container mb-4" size={36} />,
        'prometheus': <SiPrometheus className="text-primary-container mb-4" size={36} />,

        // Data Science
        'scientist': <Brain className="text-primary-container mb-4" size={36} />,
        'datascience': <Brain className="text-primary-container mb-4" size={36} />,
        'statistics': <Brain className="text-primary-container mb-4" size={36} />,
        'visualization': <Brain className="text-primary-container mb-4" size={36} />,

        // Blockchain
        'blockchain': <Link className="text-primary-container mb-4" size={36} />,
        'web3': <Link className="text-primary-container mb-4" size={36} />,
        'crypto': <Link className="text-primary-container mb-4" size={36} />,
        'bitcoin': <Link className="text-primary-container mb-4" size={36} />,
        'ethereum': <Link className="text-primary-container mb-4" size={36} />,
        'smartcontracts': <Link className="text-primary-container mb-4" size={36} />,

        // Gaming
        'game': <Gamepad className="text-primary-container mb-4" size={36} />,
        'gaming': <Gamepad className="text-primary-container mb-4" size={36} />,
        'unity': <FaUnity className="text-primary-container mb-4" size={36} />,
        'unreal': <Gamepad className="text-primary-container mb-4" size={36} />,

        // Communication
        'message': <MessageSquare className="text-primary-container mb-4" size={36} />,
        'chat': <MessageSquare className="text-primary-container mb-4" size={36} />,
        'slack': <SiSlack className="text-primary-container mb-4" size={36} />,
        'teams': <BsMicrosoftTeams className="text-primary-container mb-4" size={36} />,

        // Miscellaneous
        'terminal': <Terminal className="text-primary-container mb-4" size={36} />,
        'cli': <Terminal className="text-primary-container mb-4" size={36} />,
        'bash': <Terminal className="text-primary-container mb-4" size={36} />,
        'powershell': <Terminal className="text-primary-container mb-4" size={36} />,
        'email': <Mail className="text-primary-container mb-4" size={36} />,
        'mail': <Mail className="text-primary-container mb-4" size={36} />,
        'send': <Send className="text-primary-container mb-4" size={36} />,
        'share': <Share2 className="text-primary-container mb-4" size={36} />,
        'globe': <Globe className="text-primary-container mb-4" size={36} />,
        'website': <Globe className="text-primary-container mb-4" size={36} />,
        'location': <MapPin className="text-primary-container mb-4" size={36} />,
        'map': <MapPin className="text-primary-container mb-4" size={36} />,
    };

    // Social Icons Map (React Icons)
    const socialIcons: Record<string, React.ReactNode> = {
        'linkedin': <FaLinkedin className="text-primary-container" size={24} />,
        'twitter': <FaTwitter className="text-primary-container" size={24} />,
        'x': <FaTwitter className="text-primary-container" size={24} />,
        'facebook': <FaFacebook className="text-primary-container" size={24} />,
        'instagram': <FaInstagram className="text-primary-container" size={24} />,
        'youtube': <FaYoutube className="text-primary-container" size={24} />,
        'whatsapp': <FaWhatsapp className="text-primary-container" size={24} />,
        'phone': <FaPhone className="text-primary-container" size={24} />,
        'call': <FaPhone className="text-primary-container" size={24} />,
        'contact': <FaPhone className="text-primary-container" size={24} />,
    };

    // Check if it's a social icon first, then tech icon
    const iconComponent = socialIcons[iconKey] || techIcons[iconKey] || <Layers className="text-primary-container mb-4" size={36} />;

    return iconComponent;
};

