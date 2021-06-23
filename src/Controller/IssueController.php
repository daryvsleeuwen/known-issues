<?php

namespace App\Controller;

use App\Entity\Issue;
use App\Form\KnownIssueType;
use App\Repository\IssueRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IssueController extends AbstractController
{
    /**
     * @Route("/issue/{id}", name="issue")
     */
    public function index(int $id, IssueRepository $issuesRepo)
    {
        $issue = $issuesRepo->find($id);
        return $this->render('issue/issue-show.html.twig', [
            'issue' => $issue
        ]);
    }

    /**
     * @Route("/issues", name="issues_overview")
     */
    public function overview(IssueRepository  $issuesRepo)
    {
        $issues = $issuesRepo->findAll();
        return $this->render('issue/issue-overview.html.twig', [
            'issues' => $issues
        ]);
    }

    /**
     * @Route("issues/create", name="create_issue")
     */
    public function create(Request $request)
    {
        if ($this->getUser()) {
            $issue = new Issue();

            $form = $this->createForm(KnownIssueType::class, $issue);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $issue = $form->getData();

                $em = $this->getDoctrine()->getManager();
                $em->persist($issue);
                $em->flush();

                return $this->redirectToRoute('issues_overview');
            }

            return $this->render('issue/issue-edit.html.twig', [
                'form' => $form->createView(),
                'issue' => $issue
            ]);
        }
        else{
            $this->addFlash('add-issue-login', 'Log eerst in voordat je een nieuwe issue kan aanmaken');
            return $this->redirectToRoute('app_login');
        }
    }

    /**
     * @Route("/issue/{id}/edit", name="edit_issue")
     */
    public function edit(Issue $issue, Request $request)
    {
        if ($this->getUser()) {
            $form = $this->createForm(KnownIssueType::class, $issue);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $issue = $form->getData();

                $em = $this->getDoctrine()->getManager();
                $em->persist($issue);
                $em->flush();

                $this->addFlash('successfull-save', 'opgeslagen');
            }

            return $this->render('issue/issue-edit.html.twig', [
                'form' => $form->createView(),
                'issue' => $issue
            ]);
        }
        else{
            $this->addFlash('edit-issue-login', 'Log eerst in voordat je een issue kan bewerken');
            return $this->redirectToRoute('app_login');
        }
    }

    /**
     * @Route("/issue/delete/{id}", name="delete_issue")
     */
    public function delete(int $id, IssueRepository $issuesRepo)
    {
        if ($this->getUser()) {
            $issue = $issuesRepo->find($id);

            $em = $this->getDoctrine()->getManager();
            $em->remove($issue);
            $em->flush();

            $this->addFlash('successfull-delete', "Issue '". $issue->getTitle() ."' is verwijderd");

            return $this->redirectToRoute('issues_overview');
        }
        else{
            $this->addFlash('add-issue-login', 'Log eerst in voordat je een issue kan verwijderen');
            return $this->redirectToRoute('app_login');
        }
    }
}
