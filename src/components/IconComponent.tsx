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

    // Tech Icons Map (removed duplicates)
    const techIcons: Record<string, React.ReactNode> = {
        // Databases
        'database': <Database className="text-primary-container" size={24} />,
        'postgresql': <SiPostgresql className="text-primary-container" size={24} />,
        'mysql': <Database className="text-primary-container" size={24} />,
        'mongodb': <SiMongodb className="text-primary-container" size={24} />,
        'redis': <SiRedis className="text-primary-container" size={24} />,
        'elasticsearch': <Database className="text-primary-container" size={24} />,
        'dynamodb': <Database className="text-primary-container" size={24} />,
        'firestore': <Database className="text-primary-container" size={24} />,
        'sqlite': <Database className="text-primary-container" size={24} />,

        // Servers & Infrastructure
        'server': <Server className="text-primary-container" size={24} />,
        'nginx': <SiNginx className="text-primary-container" size={24} />,
        'apache': <SiApache className="text-primary-container" size={24} />,
        'nodejs': <FaNodeJs className="text-primary-container" size={24} />,
        'python': <FaPython className="text-primary-container" size={24} />,
        'java': <FaJava className="text-primary-container" size={24} />,
        'dotnet': <SiDotnet className="text-primary-container" size={24} />,
        'php': <SiPhp className="text-primary-container" size={24} />,
        'ruby': <SiRuby className="text-primary-container" size={24} />,
        'go': <SiGo className="text-primary-container" size={24} />,
        'rust': <SiRust className="text-primary-container" size={24} />,
        'typescript': <SiTypescript className="text-primary-container" size={24} />,
        'javascript': <SiJavascript className="text-primary-container" size={24} />,

        // Cloud
        'cloud': <Cloud className="text-primary-container" size={24} />,
        'aws': <Cloud className="text-primary-container" size={24} />,
        'azure': <Cloud className="text-primary-container" size={24} />,
        'gcp': <Cloud className="text-primary-container" size={24} />,
        'cloudflare': <Cloud className="text-primary-container" size={24} />,
        'digitalocean': <Cloud className="text-primary-container" size={24} />,
        'heroku': <Cloud className="text-primary-container" size={24} />,
        'vercel': <Cloud className="text-primary-container" size={24} />,
        'netlify': <Cloud className="text-primary-container" size={24} />,

        // Security
        'shield': <Shield className="text-primary-container" size={24} />,
        'security': <Shield className="text-primary-container" size={24} />,
        'ssl': <Shield className="text-primary-container" size={24} />,
        'jwt': <Shield className="text-primary-container" size={24} />,
        'oauth': <Shield className="text-primary-container" size={24} />,
        'firebase': <SiFirebase className="text-primary-container" size={24} />,
        'auth0': <SiAuth0 className="text-primary-container" size={24} />,

        // CPU/Processing
        'cpu': <Cpu className="text-primary-container" size={24} />,
        'microservices': <Cpu className="text-primary-container" size={24} />,
        'distributed': <Cpu className="text-primary-container" size={24} />,
        'parallel': <Cpu className="text-primary-container" size={24} />,
        'concurrent': <Cpu className="text-primary-container" size={24} />,
        'async': <Cpu className="text-primary-container" size={24} />,

        // Layers/Architecture
        'layers': <Layers className="text-primary-container" size={24} />,
        'architecture': <Layers className="text-primary-container" size={24} />,
        'stack': <Layers className="text-primary-container" size={24} />,
        'fullstack': <Layers className="text-primary-container" size={24} />,
        'microfrontend': <Layers className="text-primary-container" size={24} />,
        'modular': <Layers className="text-primary-container" size={24} />,
        'components': <Layers className="text-primary-container" size={24} />,

        // Containers
        'container': <Container className="text-primary-container" size={24} />,
        'docker': <FaDocker className="text-primary-container" size={24} />,
        'kubernetes': <SiKubernetes className="text-primary-container" size={24} />,
        'k8s': <SiKubernetes className="text-primary-container" size={24} />,
        'openshift': <Container className="text-primary-container" size={24} />,

        // Frameworks
        'react': <FaReact className="text-primary-container" size={24} />,
        'nextjs': <SiNextdotjs className="text-primary-container" size={24} />,
        'vue': <SiVuedotjs className="text-primary-container" size={24} />,
        'angular': <SiAngular className="text-primary-container" size={24} />,
        'svelte': <SiSvelte className="text-primary-container" size={24} />,

        // AI/ML
        'ai': <Atom className="text-primary-container" size={24} />,
        'ml': <Atom className="text-primary-container" size={24} />,
        'tensorflow': <SiTensorflow className="text-primary-container" size={24} />,
        'pytorch': <SiPytorch className="text-primary-container" size={24} />,
        'brain': <Brain className="text-primary-container" size={24} />,

        // IoT
        'radio': <Radio className="text-primary-container" size={24} />,
        'iot': <Radio className="text-primary-container" size={24} />,
        'mqtt': <Radio className="text-primary-container" size={24} />,
        'ble': <Radio className="text-primary-container" size={24} />,
        'zigbee': <Radio className="text-primary-container" size={24} />,

        // Code
        'braces': <Braces className="text-primary-container" size={24} />,
        'code': <Braces className="text-primary-container" size={24} />,
        'programming': <Braces className="text-primary-container" size={24} />,
        'development': <Braces className="text-primary-container" size={24} />,
        'software': <Braces className="text-primary-container" size={24} />,
        'engineering': <Braces className="text-primary-container" size={24} />,
        'algorithm': <Braces className="text-primary-container" size={24} />,
        'datastructures': <Braces className="text-primary-container" size={24} />,

        // Audio
        'audiolines': <AudioLines className="text-primary-container" size={24} />,
        'audio': <AudioLines className="text-primary-container" size={24} />,
        'music': <AudioLines className="text-primary-container" size={24} />,
        'voice': <AudioLines className="text-primary-container" size={24} />,
        'sound': <AudioLines className="text-primary-container" size={24} />,
        'podcast': <AudioLines className="text-primary-container" size={24} />,

        // Search
        'search': <Search className="text-primary-container" size={24} />,
        'optimization': <Search className="text-primary-container" size={24} />,
        'analytics': <Search className="text-primary-container" size={24} />,
        'seo': <Search className="text-primary-container" size={24} />,
        'data': <Search className="text-primary-container" size={24} />,
        'bigdata': <Search className="text-primary-container" size={24} />,

        // Mobile
        'smartphone': <Smartphone className="text-primary-container" size={24} />,
        'mobile': <Smartphone className="text-primary-container" size={24} />,
        'android': <Smartphone className="text-primary-container" size={24} />,
        'ios': <Smartphone className="text-primary-container" size={24} />,
        'reactnative': <Smartphone className="text-primary-container" size={24} />,
        'flutter': <SiFlutter className="text-primary-container" size={24} />,
        'ionic': <SiIonic className="text-primary-container" size={24} />,

        // Bot
        'bot': <Bot className="text-primary-container" size={24} />,
        'chatbot': <Bot className="text-primary-container" size={24} />,
        'automation': <Bot className="text-primary-container" size={24} />,
        'rpa': <Bot className="text-primary-container" size={24} />,
        'discord': <SiDiscord className="text-primary-container" size={24} />,
        'telegram': <SiTelegram className="text-primary-container" size={24} />,

        // Git & Version Control
        'github': <FaGithub className="text-primary-container" size={24} />,
        'git': <GitBranch className="text-primary-container" size={24} />,
        'gitlab': <FaGitlab className="text-primary-container" size={24} />,
        'bitbucket': <FaBitbucket className="text-primary-container" size={24} />,
        'versioncontrol': <GitBranch className="text-primary-container" size={24} />,
        'vcs': <GitBranch className="text-primary-container" size={24} />,

        // Web/API
        'webhook': <Webhook className="text-primary-container" size={24} />,
        'api': <Webhook className="text-primary-container" size={24} />,
        'rest': <Webhook className="text-primary-container" size={24} />,
        'graphql': <SiGraphql className="text-primary-container" size={24} />,
        'websocket': <Webhook className="text-primary-container" size={24} />,
        'grpc': <Webhook className="text-primary-container" size={24} />,

        // Performance
        'gauge': <Gauge className="text-primary-container" size={24} />,
        'performance': <Gauge className="text-primary-container" size={24} />,
        'optimize': <Gauge className="text-primary-container" size={24} />,
        'speed': <Gauge className="text-primary-container" size={24} />,
        'loadbalancing': <Gauge className="text-primary-container" size={24} />,
        'caching': <Gauge className="text-primary-container" size={24} />,

        // UI/UX
        'layout': <Layout className="text-primary-container" size={24} />,
        'design': <Layout className="text-primary-container" size={24} />,
        'ui': <Layout className="text-primary-container" size={24} />,
        'ux': <Layout className="text-primary-container" size={24} />,
        'wireframe': <Layout className="text-primary-container" size={24} />,
        'prototype': <Layout className="text-primary-container" size={24} />,
        'responsive': <Layout className="text-primary-container" size={24} />,

        // DevOps
        'devops': <GitBranch className="text-primary-container" size={24} />,
        'ci': <GitBranch className="text-primary-container" size={24} />,
        'cd': <GitBranch className="text-primary-container" size={24} />,
        'pipeline': <GitBranch className="text-primary-container" size={24} />,
        'jenkins': <FaJenkins className="text-primary-container" size={24} />,
        'githubactions': <SiGithubactions className="text-primary-container" size={24} />,
        'gitlabci': <SiGitlab className="text-primary-container" size={24} />,

        // Testing
        'test': <ClipboardCheck className="text-primary-container" size={24} />,
        'testing': <ClipboardCheck className="text-primary-container" size={24} />,
        'qa': <ClipboardCheck className="text-primary-container" size={24} />,
        'unit': <ClipboardCheck className="text-primary-container" size={24} />,
        'integration': <ClipboardCheck className="text-primary-container" size={24} />,
        'e2e': <ClipboardCheck className="text-primary-container" size={24} />,

        // Monitoring
        'monitor': <Monitor className="text-primary-container" size={24} />,
        'logging': <Monitor className="text-primary-container" size={24} />,
        'metrics': <Monitor className="text-primary-container" size={24} />,
        'alerting': <Monitor className="text-primary-container" size={24} />,
        'grafana': <SiGrafana className="text-primary-container" size={24} />,
        'prometheus': <SiPrometheus className="text-primary-container" size={24} />,

        // Data Science
        'scientist': <Brain className="text-primary-container" size={24} />,
        'datascience': <Brain className="text-primary-container" size={24} />,
        'statistics': <Brain className="text-primary-container" size={24} />,
        'visualization': <Brain className="text-primary-container" size={24} />,

        // Blockchain
        'blockchain': <Link className="text-primary-container" size={24} />,
        'web3': <Link className="text-primary-container" size={24} />,
        'crypto': <Link className="text-primary-container" size={24} />,
        'bitcoin': <Link className="text-primary-container" size={24} />,
        'ethereum': <Link className="text-primary-container" size={24} />,
        'smartcontracts': <Link className="text-primary-container" size={24} />,

        // Gaming
        'game': <Gamepad className="text-primary-container" size={24} />,
        'gaming': <Gamepad className="text-primary-container" size={24} />,
        'unity': <FaUnity className="text-primary-container" size={24} />,
        'unreal': <Gamepad className="text-primary-container" size={24} />,

        // Communication
        'message': <MessageSquare className="text-primary-container" size={24} />,
        'chat': <MessageSquare className="text-primary-container" size={24} />,
        'slack': <SiSlack className="text-primary-container" size={24} />,
        'teams': <BsMicrosoftTeams className="text-primary-container" size={24} />,

        // Miscellaneous
        'terminal': <Terminal className="text-primary-container" size={24} />,
        'cli': <Terminal className="text-primary-container" size={24} />,
        'bash': <Terminal className="text-primary-container" size={24} />,
        'powershell': <Terminal className="text-primary-container" size={24} />,
        'email': <Mail className="text-primary-container" size={24} />,
        'mail': <Mail className="text-primary-container" size={24} />,
        'send': <Send className="text-primary-container" size={24} />,
        'share': <Share2 className="text-primary-container" size={24} />,
        'globe': <Globe className="text-primary-container" size={24} />,
        'website': <Globe className="text-primary-container" size={24} />,
        'location': <MapPin className="text-primary-container" size={24} />,
        'map': <MapPin className="text-primary-container" size={24} />,
    };

    // Social Icons Map
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

    return socialIcons[iconKey] || techIcons[iconKey] || <Layers className="text-primary-container" size={24} />;
};

