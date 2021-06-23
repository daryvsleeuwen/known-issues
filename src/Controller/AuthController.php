<?php

namespace App\Controller;

use App\Entity\User;
use Psr\Container\ContainerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use App\Form\RegisterType;

class AuthController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function loginRegister(AuthenticationUtils $authenticationUtils): Response
    {
//         if ($this->getUser()) {
//             return $this->redirectToRoute('issues_overview');
//         }

        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        $parameters = [
            'last_username' => $lastUsername,
            'error' => $error];

//        if($registerForm !== null){
//           $parameters[] = $registerForm;
//        }

        return $this->render('security/login.html.twig', $parameters);
    }

    /**
     * @Route("/register", name="app_register")
     */
    public function register(Request $request)
    {
//        $user = new User();
//
//        $registerForm = $this->createForm(RegisterType::class, $user);
//
//        $registerForm->handleRequest($request);
//
//        if ($registerForm->isSubmitted() && $registerForm->isValid()) {
//            $user = $registerForm->getData();
//
//            $em = $this->getDoctrine()->getManager();
//            $em->persist($user);
//            $em->flush();
//
//            $this->addFlash('succesfull-login', 'Je account is aangemaakt!');
//        }
//
//        return $this->redirectToRoute('app_login', ['registerForm' => $registerForm]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
